'server-only';

import { type RactivesMarkedRecord } from '@/context/playLoteria/playLoteriaContext';
import { env } from '@/env.mjs';
import {
	AddLoteriaCardSchema,
	JoinToLoteriaSchema,
	LoginToLoteriaSchema,
	UpdatePlantillaCardSchema,
} from '@/schema/loteria';
import {
	adminProcedure,
	publicProcedure,
	router,
	userProcedure,
} from '@/trpc/server/trpc';
import { TRPCError } from '@trpc/server';
import {
	loteriaCards,
	loteriaDeck,
	loteriaGame,
	loteriaPlantilla,
	loteriaPlayer,
	loteriaSessions,
	users,
} from 'anime-db';
import { and, asc, eq, ne } from 'drizzle-orm';
import moment from 'moment-timezone';
import { customAlphabet, nanoid, urlAlphabet } from 'nanoid';
import { UTApi } from 'uploadthing/server';

import { type JwtAnimePlayer } from '@/types/jwt.types';
import { db } from '@/lib/db';
import { createJWT, verifyJWT } from '@/lib/jwt';
import { generarNumerosAleatorios, shuffleArray } from '@/lib/utils';

const utapi = new UTApi({ apiKey: env.UPLOADTHING_SECRET });

type TypeCardsxPlayer = typeof loteriaPlantilla.$inferInsert;

export const loteriaRouter = router({
	getCards: publicProcedure.query(async () => {
		return await db.query.loteriaCards.findMany({
			orderBy: asc(loteriaCards.index),
		});
	}),
	addCard: publicProcedure
		.input(AddLoteriaCardSchema)
		.mutation(async (opts) => {
			const values = opts.input;
			const nanoid = customAlphabet(urlAlphabet, 15);
			const idLoteriaCard = nanoid();
			const index = (await db.query.loteriaCards.findMany()).length + 1;
			await db.insert(loteriaCards).values({
				id: idLoteriaCard,
				index,
				...values,
			});
			const card = await db.query.loteriaCards.findFirst({
				where: eq(loteriaCards.id, idLoteriaCard),
			});
			utapi.renameFile({
				fileKey: values.imgKey,
				newName: `Loteria-${index}-${values.title}`,
			});
			return card!;
		}),
	getRandomCards: publicProcedure.query(async () => {
		const cards = await db.query.loteriaCards.findMany({
			orderBy: asc(loteriaCards.index),
		});
		const random = generarNumerosAleatorios(20, 1, cards.length);

		return random.map((i) => cards[i - 1]);
	}),

	createLoteriaGame: adminProcedure.query(async (opts) => {
		const { user } = opts.ctx.session;
		const userJWT: JwtAnimePlayer = {
			role: user.role,
			nick: user.nickName!,
			id: user.id,
			typeUser: 'register',
		};

		const currentGame = await db.query.loteriaGame.findFirst({
			where: ne(loteriaGame.state, 'finish'),
			with: {
				deck: {
					columns: {},
					with: {
						card: true,
					},
					orderBy: (cTg, { asc }) => [asc(cTg.order)],
				},
			},
		});
		const jwt = await createJWT(userJWT);

		if (currentGame) {
			const { deck, ...game } = currentGame;
			const deckCards = deck.map((c) => c.card);
			return { game, cards: deckCards, token: jwt, created: false };
		}

		const idLoteriaGame = nanoid(30);
		const allCards = await db.query.loteriaCards.findMany({
			orderBy: asc(loteriaCards.index),
		});
		const allCardsRandom = shuffleArray(allCards);
		const deck = allCardsRandom.map((c, i) => ({
			cardId: c.id,
			order: i,
			gameId: idLoteriaGame,
		}));

		const dateMX = moment.tz('America/Mexico_City');

		await db.insert(loteriaGame).values({
			id: idLoteriaGame,
			date: dateMX.toDate(),
		});
		await db.insert(loteriaDeck).values(deck);
		const game = await db.query.loteriaGame.findFirst({
			where: eq(loteriaGame.id, idLoteriaGame),
		});
		return {
			game: game!,
			cards: allCardsRandom,
			token: jwt,
			created: true,
		};
	}),
	getCurrentGame: publicProcedure.query(async () => {
		const currentGame = await db.query.loteriaGame.findFirst({
			where: ne(loteriaGame.state, 'finish'),
		});
		return currentGame;
	}),
	joinUserLoteria: userProcedure.mutation(async (opts) => {
		const session = opts.ctx.session;
		const currentGame = await db.query.loteriaGame.findFirst({
			where: ne(loteriaGame.state, 'finish'),
			with: {
				deck: {
					columns: {},
					with: {
						card: true,
					},
					orderBy: (cards, { asc }) => [asc(cards.order)],
				},
			},
		});

		if (!currentGame) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'No existe sala a unirse',
			});
		}
		let currentPassCards: string[] = [];
		if (currentGame.state === 'play') {
			const passCards = currentGame.deck.slice(0, currentGame.currentCard + 1);
			currentPassCards = passCards.map((c) => c.card.id);
		}

		const gameId = currentGame.id;
		const userId = session.user.id;

		const user = await db.query.users.findFirst({
			where: eq(users.id, userId),
		});
		if (!user) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'No existe usuario',
			});
		}

		const userJWT: JwtAnimePlayer = {
			role: user.role,
			nick: user.nickName!,
			id: userId,
			typeUser: 'register',
		};
		const jwt = await createJWT(userJWT);

		const playerSession = await db.query.loteriaSessions.findFirst({
			where: and(
				eq(loteriaSessions.gameId, gameId),
				eq(loteriaSessions.playerId, userId),
			),
		});
		const player = await db.query.loteriaPlayer.findFirst({
			where: eq(loteriaPlayer.id, userId),
		});
		if (!player) {
			await db.insert(loteriaPlayer).values({
				id: userId,
				nickName: user.nickName!,
				userType: 'register',
			});
		}
		const reactive: RactivesMarkedRecord = {};
		if (!playerSession) {
			const table = await generateRandomTable();
			const tableInfo: TypeCardsxPlayer[] = table.map((c, i) => ({
				cardId: c.id,
				playerId: userId,
				gameId,
				order: i,
			}));

			await db.insert(loteriaPlantilla).values(tableInfo);
			await db.insert(loteriaSessions).values({
				gameId,
				playerId: userId,
			});

			table.forEach((value) => {
				Object.assign(reactive, {
					[value.id]: currentPassCards.includes(value.id),
				});
			});
			return { jwt, reactive, playerCards: table };
		}
		const cards = await db.query.loteriaPlantilla.findMany({
			columns: {
				checked: true,
			},
			with: {
				card: true,
			},
		});

		const playerCards = cards.map(({ card, checked }) => {
			Object.assign(reactive, {
				[card.id]: checked,
			});
			return card;
		});

		return { jwt, reactive, playerCards };
	}),
	joinGuestLoteria: publicProcedure
		.input(JoinToLoteriaSchema)
		.mutation(async (opts) => {
			const { nickName } = opts.input;

			const currentGame = await db.query.loteriaGame.findFirst({
				where: ne(loteriaGame.state, 'finish'),
				with: {
					deck: {
						columns: {},
						with: {
							card: true,
						},
						orderBy: (cards, { asc }) => [asc(cards.order)],
					},
				},
			});

			if (!currentGame) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No existe sala a unirse',
				});
			}
			let currentPassCards: string[] = [];
			if (currentGame.state === 'play') {
				const passCards = currentGame.deck.slice(
					0,
					currentGame.currentCard + 1,
				);
				currentPassCards = passCards.map((c) => c.card.id);
			}

			const gameId = currentGame.id;
			const nickNameIsUsed = await db.query.users.findFirst({
				where: eq(users.nickName, nickName),
			});

			const nickNamePlaying = await db.query.loteriaPlayer.findFirst({
				where: eq(loteriaPlayer.nickName, nickName),
				with: {
					sessions: {
						where: (sessions, { eq }) => eq(sessions.gameId, gameId),
					},
				},
			});

			if (nickNameIsUsed || nickNamePlaying) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'El nickName ya esta en uso, escoge otro',
				});
			}

			const playerId = nanoid(40);
			const table = await generateRandomTable();
			const tableInfo: TypeCardsxPlayer[] = table.map((c, i) => ({
				cardId: c.id,
				playerId,
				gameId,
				order: i,
			}));
			await db.insert(loteriaPlayer).values({
				id: playerId,
				nickName,
				userType: 'guest',
			});
			await db.insert(loteriaPlantilla).values(tableInfo);
			await db.insert(loteriaSessions).values({
				gameId,
				playerId,
			});

			const userJWT: JwtAnimePlayer = {
				role: 'player',
				nick: nickName,
				id: playerId,
				typeUser: 'guest',
			};

			const jwt = await createJWT(userJWT);

			const reactive: RactivesMarkedRecord = {};
			table.forEach((value) => {
				Object.assign(reactive, {
					[value.id]: currentPassCards.includes(value.id),
				});
			});
			return { jwt, reactive, playerCards: table };
		}),
	loginLoteria: publicProcedure
		.input(LoginToLoteriaSchema)
		.mutation(async (opts) => {
			const { jwt } = opts.input;
			const res = await verifyJWT<JwtAnimePlayer>(jwt);
			if (!res) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'Token invalido',
				});
			}
			const currentGame = await db.query.loteriaGame.findFirst({
				where: ne(loteriaGame.state, 'finish'),
				with: {
					deck: {
						columns: {},
						orderBy: (cTg, { asc }) => [asc(cTg.order)],
						with: {
							card: true,
						},
					},
				},
			});

			if (!currentGame) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No hay juego',
				});
			}
			const player = await db.query.loteriaPlayer.findFirst({
				where: eq(loteriaPlayer.id, res.id),
			});

			if (!player) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No existe el jugador',
				});
			}
			const reactive: RactivesMarkedRecord = {};
			const cards = await db.query.loteriaPlantilla.findMany({
				columns: {
					checked: true,
				},
				with: {
					card: true,
				},
				orderBy: [asc(loteriaPlantilla.order)],
				where: and(
					eq(loteriaPlantilla.playerId, player.id),
					eq(loteriaPlantilla.gameId, currentGame.id),
				),
			});
			if (cards.length < 20) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'El jugador no tiene plantilla',
				});
			}
			const playerCards = cards.map(({ card, checked }) => {
				Object.assign(reactive, {
					[card.id]: checked,
				});
				return card;
			});

			return { reactive, playerCards };
		}),
	updatePlantillaCard: publicProcedure
		.input(UpdatePlantillaCardSchema)
		.mutation(async (opts) => {
			const { jwt, from, to } = opts.input;
			const res = await verifyJWT<JwtAnimePlayer>(jwt);
			if (!res) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'Token invalido',
				});
			}
			const currentGame = await db.query.loteriaGame.findFirst({
				where: ne(loteriaGame.state, 'finish'),
				with: {
					deck: {
						columns: {},
						orderBy: (cTg, { asc }) => [asc(cTg.order)],
						with: {
							card: true,
						},
					},
				},
			});

			if (!currentGame) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No hay juego',
				});
			}
			const player = await db.query.loteriaPlayer.findFirst({
				where: eq(loteriaPlayer.id, res.id),
			});

			if (!player) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No existe el jugador',
				});
			}
			const oldCard = db.query.loteriaPlantilla.findFirst({
				where: and(
					eq(loteriaPlantilla.playerId, res.id),
					eq(loteriaPlantilla.gameId, currentGame.id),
					eq(loteriaPlantilla.cardId, from),
				),
			});
			if (!oldCard) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No existe la carta en la plantilla',
				});
			}

			const newCard = db.query.loteriaCards.findFirst({
				where: eq(loteriaCards.id, to),
			});
			if (!newCard) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No existe la carta',
				});
			}

			await db
				.update(loteriaPlantilla)
				.set({
					cardId: to,
				})
				.where(
					and(
						eq(loteriaPlantilla.playerId, res.id),
						eq(loteriaPlantilla.gameId, currentGame.id),
						eq(loteriaPlantilla.cardId, from),
					),
				);

			return true;
		}),
	getPlayesrOnline: publicProcedure.query(async () => {
		const currentGame = await db.query.loteriaGame.findFirst({
			where: ne(loteriaGame.state, 'finish'),
		});
		if (!currentGame) {
			console.log('getPlayersGameLoteria no game current playing');

			return [];
		}
		const players = await db.query.loteriaPlayer.findMany({
			where: eq(loteriaPlayer.online, true),
			with: {
				sessions: {
					where: (sessions, { eq }) => eq(sessions.gameId, currentGame.id),
				},
			},
		});
		return players.map((p) => p.nickName);
	}),
	generateRandomTable: publicProcedure
		.input(LoginToLoteriaSchema)
		.mutation(async (opts) => {
			const { jwt } = opts.input;
			const res = await verifyJWT<JwtAnimePlayer>(jwt);
			if (!res) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'Token invalido',
				});
			}
			const currentGame = await db.query.loteriaGame.findFirst({
				where: ne(loteriaGame.state, 'finish'),
				with: {
					deck: {
						columns: {},
						orderBy: (cTg, { asc }) => [asc(cTg.order)],
						with: {
							card: true,
						},
					},
				},
			});

			if (!currentGame) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No hay juego',
				});
			}

			if (currentGame.state !== 'lobby') {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'El juego ya inicio',
				});
			}
			const player = await db.query.loteriaPlayer.findFirst({
				where: eq(loteriaPlayer.id, res.id),
			});

			if (!player) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No existe el jugador',
				});
			}
			const playerId = player.id;
			const gameId = currentGame.id;
			await db
				.delete(loteriaPlantilla)
				.where(
					and(
						eq(loteriaPlantilla.playerId, player.id),
						eq(loteriaPlantilla.gameId, currentGame.id),
					),
				);

			const table = await generateRandomTable();
			const tableInfo: TypeCardsxPlayer[] = table.map((c, i) => ({
				cardId: c.id,
				playerId,
				gameId,
				order: i,
			}));

			await db.insert(loteriaPlantilla).values(tableInfo);
			const reactive: RactivesMarkedRecord = {};
			const playerCards = table.map((card) => {
				Object.assign(reactive, {
					[card.id]: false,
				});
				return card;
			});
			return { reactive, playerCards };
		}),
});

const generateRandomTable = async () => {
	const cards = await db.query.loteriaCards.findMany({
		orderBy: asc(loteriaCards.index),
	});
	const random = generarNumerosAleatorios(20, 1, cards.length);

	return random.map((i) => cards[i - 1]);
};
