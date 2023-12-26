'server-only';

import { env } from '@/env.mjs';
import {
	AddLoteriaCardSchema,
	JoinToLoteriaSchema,
	LoginToLoteriaSchema,
} from '@/schema/loteria';
import { adminProcedure, publicProcedure, router } from '@/trpc/server/trpc';
import { TRPCError } from '@trpc/server';
import {
	loteriaCards,
	loteriaCardsToLoteriaGames,
	loteriaCardsToPlayerLoteria,
	loteriaGame,
	playerLoteria,
	users,
} from 'anime-db';
import { and, asc, eq, ne } from 'drizzle-orm';
import { customAlphabet, nanoid, urlAlphabet } from 'nanoid';
import { UTApi } from 'uploadthing/server';

import { type JwtAnimePlayer } from '@/types/jwt.types';
import { db } from '@/lib/db';
import { createJWT, verifyJWT } from '@/lib/jwt';
import { generarNumerosAleatorios, shuffleArray } from '@/lib/utils';

const utapi = new UTApi({ apiKey: env.UPLOADTHING_SECRET });
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

	startLoteriaHost: adminProcedure.query(async (opts) => {
		const { user } = opts.ctx.session;
		const currentGame = await db.query.loteriaGame.findFirst({
			where: ne(loteriaGame.state, 'finish'),
			with: {
				cards: {
					orderBy: (cTg, { asc }) => [asc(cTg.order)],
					columns: {},
					with: {
						card: true,
					},
				},
			},
		});
		const userJWT: JwtAnimePlayer = {
			role: user.role,
			nick: user.nickName!,
			id: user.id,
			typeUser: 'register',
		};

		const jwt = await createJWT(userJWT);
		if (currentGame) {
			const { cards, ...rest } = currentGame;
			const deck = cards.map((c) => c.card);
			return { game: { ...rest, cards: deck }, token: jwt };
		}
		const nanoid = customAlphabet(urlAlphabet);
		const idLoteriaGame = nanoid();
		const cards = await db.query.loteriaCards.findMany({
			orderBy: asc(loteriaCards.index),
		});
		const newOrder = shuffleArray(cards);
		const deck = newOrder.map((c, i) => ({
			cardId: c.id,
			order: i,
			gameId: idLoteriaGame,
		}));
		await db.insert(loteriaGame).values({
			id: idLoteriaGame,
		});
		await db.insert(loteriaCardsToLoteriaGames).values(deck);
		const game = await db.query.loteriaGame.findFirst({
			where: ne(loteriaGame.state, 'finish'),
			with: {
				cards: {
					orderBy: (cTg, { asc }) => [asc(cTg.order)],
					columns: {},
					with: {
						card: true,
					},
				},
			},
		});

		const { cards: _, ...rest } = game!;

		return {
			game: {
				...rest,
				cards: newOrder,
			},
			token: jwt,
		};
	}),
	getCurrentGame: publicProcedure.query(async () => {
		const currentGame = await db.query.loteriaGame.findFirst({
			where: ne(loteriaGame.state, 'finish'),
		});
		return currentGame;
	}),
	joinToLoteria: publicProcedure
		.input(JoinToLoteriaSchema)
		.mutation(async (opts) => {
			const currentGame = await db.query.loteriaGame.findFirst({
				where: ne(loteriaGame.state, 'finish'),
				with: {
					cards: {
						orderBy: (cTg, { asc }) => [asc(cTg.order)],
					},
				},
			});

			if (!currentGame) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No existe sala a unirse',
				});
			}
			const { nickName } = opts.input;
			const gameId = currentGame.id;
			const session = opts.ctx.session;

			if (session) {
				const userId = session.user.id;
				console.log('join user');

				const user = await db.query.users.findFirst({
					where: eq(users.id, userId),
				});

				if (!user) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: 'No existe usuario',
					});
				}
				const isCurrentPlay = await db.query.playerLoteria.findFirst({
					where: and(
						eq(playerLoteria.userId, userId),
						eq(playerLoteria.gameId, gameId),
					),
				});
				const userJWT: JwtAnimePlayer = {
					role: user.role,
					nick: user.nickName!,
					id: userId,
					typeUser: 'register',
				};
				const jwt = await createJWT(userJWT);

				if (!isCurrentPlay) {
					const table = await generateRandomTable();
					const tableInfo = table.map((c) => ({
						cardId: c.id,
						playerId: userId,
						gameId,
					}));
					await db.insert(loteriaCardsToPlayerLoteria).values(tableInfo);
					await db.insert(playerLoteria).values({
						gameId,
						nickName: user.nickName!,
						userId,
						userType: 'register',
						tableCheck: Array.from({ length: 20 }).map(() => false),
					});
					return { jwt, playerCards: table };
				}

				// const cardsInfo = await db.query.loteriaCards.findFirst({
				// 	columns: {},
				// 	with: {
				// 		cardsPlayer:{
				// 			where:()
				// 		}
				// 	},
				// });
				// if (!cardsInfo ||!cardsInfo.cards) {
				// 	throw new TRPCError({
				// 		code: 'BAD_REQUEST',
				// 		message: '',
				// 	});
				// }
				// const cards = cardsInfo.cards.map((c) => ({ ...c.card }));
				// if (cards.length === 0) {
				// 	throw new TRPCError({
				// 		code: 'BAD_REQUEST',
				// 		message: '',
				// 	});
				// }
				return { jwt, playerCards: [] };
			} else {
				const nickNameIsUsed = await db.query.users.findFirst({
					where: eq(users.nickName, nickName),
				});

				const nickNamePlaying = await db.query.playerLoteria.findFirst({
					where: and(
						eq(playerLoteria.gameId, gameId),
						eq(playerLoteria.nickName, nickName),
					),
				});

				if (nickNameIsUsed || nickNamePlaying) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: 'El nickName ya esta en uso, escoge otro',
					});
				}

				const userId = nanoid(30);
				const table = await generateRandomTable();
				const tableInfo = table.map((c) => ({
					cardId: c.id,
					playerId: userId,
					gameId,
				}));
				await db.insert(loteriaCardsToPlayerLoteria).values(tableInfo);

				await db.insert(playerLoteria).values({
					gameId,
					nickName,
					userId,
					userType: 'guest',
					tableCheck: Array.from({ length: 20 }).map(() => false),
				});

				const userJWT: JwtAnimePlayer = {
					role: 'player',
					nick: nickName,
					id: userId,
					typeUser: 'guest',
				};
				const jwt = await createJWT(userJWT);
				return { jwt, playerCards: table };
			}
		}),
	loginLoteria: publicProcedure
		.input(LoginToLoteriaSchema)
		.mutation(async (opts) => {
			const { jwt } = opts.input;
			const res = await verifyJWT<JwtAnimePlayer>(jwt);
			const currentGame = await db.query.loteriaGame.findFirst({
				where: ne(loteriaGame.state, 'finish'),
				with: {
					cards: {
						orderBy: (cTg, { asc }) => [asc(cTg.order)],
					},
				},
			});
			if (!res || !currentGame) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: '',
				});
			}
			const cardsInfo = await db.query.playerLoteria.findFirst({
				columns: {},
				with: {
					cards: {
						columns: {},
						with: {
							card: true,
						},
					},
				},
				where: and(
					eq(playerLoteria.gameId, currentGame.id),
					eq(playerLoteria.userId, res.id),
				),
			});
			if (cardsInfo) {
				const cc = cardsInfo.cards.map((c) => c.card);
				return cc;
			} else {
				console.log('no cards info');
			}

			return [];
		}),
	getPlayesrOnline: publicProcedure.query(async () => {
		const currentGame = await db.query.loteriaGame.findFirst({
			where: ne(loteriaGame.state, 'finish'),
		});
		if (!currentGame) {
			console.log('getPlayersGameLoteria no game current playing');

			return [];
		}
		const players = await db.query.playerLoteria.findMany({
			where: and(
				eq(playerLoteria.gameId, currentGame.id),
				eq(playerLoteria.online, true),
			),
		});
		return players.map((p) => p.nickName);
	}),
});

const generateRandomTable = async () => {
	const cards = await db.query.loteriaCards.findMany({
		orderBy: asc(loteriaCards.index),
	});
	const random = generarNumerosAleatorios(20, 1, cards.length);

	return random.map((i) => cards[i - 1]);
};
