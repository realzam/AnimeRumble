'server-only';

import { env } from '@/env.mjs';
import { AddLoteriaCardSchema, JoinToLoteriaSchema } from '@/schema/loteria';
import { publicProcedure, router } from '@/trpc/server/trpc';
import { TRPCError } from '@trpc/server';
import {
	loteriaCards,
	loteriaCardsToLoteriaGames,
	loteriaGame,
	playerLoteria,
	users,
} from 'anime-db';
import { and, asc, eq, ne } from 'drizzle-orm';
import { customAlphabet, nanoid, urlAlphabet } from 'nanoid';
import { UTApi } from 'uploadthing/server';

import { type JwtAnimePlayer } from '@/types/jwt.types';
import { db } from '@/lib/db';
import { createJWT } from '@/lib/jwt';
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

	startLoteriaHost: publicProcedure.query(async () => {
		const currentGame = await db.query.loteriaGame.findFirst({
			where: ne(loteriaGame.state, 'finish'),
			with: {
				cards: {
					orderBy: (cTg, { asc }) => [asc(cTg.order)],
				},
			},
		});
		if (currentGame) {
			return currentGame;
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
				},
			},
		});
		return game!;
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
				if (!isCurrentPlay) {
					await db.insert(playerLoteria).values({
						gameId,
						nickName: user.nickName!,
						userId,
						userType: 'register',
					});
				}

				const userJWT: JwtAnimePlayer = {
					role: user.role,
					nick: user.nickName!,
					id: userId,
					typeUser: 'register',
				};
				const jwt = await createJWT(userJWT);
				return jwt;
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
				await db.insert(playerLoteria).values({
					gameId,
					nickName,
					userId,
					userType: 'guest',
				});

				const userJWT: JwtAnimePlayer = {
					role: 'player',
					nick: nickName,
					id: userId,
					typeUser: 'guest',
				};
				const jwt = await createJWT(userJWT);
				return jwt;
			}
		}),
});
