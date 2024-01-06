import {
	db,
	loteriaDeck,
	loteriaGame,
	loteriaPlantilla,
	loteriaPlayer,
	loteriaWinners,
} from 'anime-db';
import { and, asc, eq, ne } from 'drizzle-orm';

import { TimeManager } from '../TimerManager';

export const getCurrentGameLoteria = async () => {
	const currentGame = await db.query.loteriaGame.findFirst({
		where: ne(loteriaGame.state, 'finish'),
	});
	return currentGame;
};

export const getOnlinePlayersGameLoteria = async () => {
	const currentGame = await getCurrentGameLoteria();
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
};

export const setOnlinePlayerLoteria = async (id: string, online: boolean) => {
	const currentGame = await getCurrentGameLoteria();
	if (currentGame) {
		await db
			.update(loteriaPlayer)
			.set({ online })
			.where(eq(loteriaPlayer.id, id));
	}
};

export const startGameLoteria = async () => {
	const currentGame = await getCurrentGameLoteria();
	if (currentGame) {
		await db.update(loteriaGame).set({ state: 'play' });
		return true;
	}
	return false;
};

export const goToLobbyGameLoteria = async () => {
	const currentGame = await getCurrentGameLoteria();
	if (currentGame) {
		await db
			.update(loteriaGame)
			.set({ state: 'lobby' })
			.where(eq(loteriaGame.id, currentGame.id));
		return true;
	}
	return false;
};

export const setOfflineAllUsers = async () => {
	await db.update(loteriaPlayer).set({ online: false });
};

export const nextCardGameLoteria = async (): Promise<
	[number, number] | undefined
> => {
	const currentGame = await getCurrentGameLoteria();
	if (currentGame) {
		const deck = await db.query.loteriaDeck.findMany({
			orderBy: asc(loteriaDeck.order),
			where: eq(loteriaDeck.gameId, currentGame.id),
			with: {
				card: true,
			},
		});
		const nextCard = currentGame.currentCard + 1;
		if (nextCard < deck.length && [nextCard]) {
			const indexPlayer = deck[nextCard]!.card.index;
			await db
				.update(loteriaGame)
				.set({ currentCard: nextCard, currentCardPlayer: indexPlayer })
				.where(eq(loteriaGame.id, currentGame.id));
			return [nextCard, indexPlayer];
		} else {
			const task = TimeManager.getInstance().getTask();
			task?.cancelInterval();
		}
	}
};

export const checkCellCardGameLoteria = async (
	playerId: string,
	target: string,
) => {
	const currentGame = await getCurrentGameLoteria();
	if (currentGame) {
		const deck = await db.query.loteriaDeck.findMany({
			orderBy: asc(loteriaDeck.order),
			where: eq(loteriaDeck.gameId, currentGame.id),
		});
		const avalibeCards = deck.slice(0, currentGame.currentCard + 1);
		if (avalibeCards.some((c) => c.cardId === target)) {
			const player = await db.query.loteriaPlayer.findFirst({
				where: eq(loteriaPlayer.id, playerId),
				with: {
					sessions: {
						where: (sessions, { eq }) => eq(sessions.gameId, currentGame.id),
					},
				},
			});
			if (player) {
				const card = await db.query.loteriaPlantilla.findFirst({
					where: and(
						eq(loteriaPlantilla.cardId, target),
						eq(loteriaPlantilla.gameId, currentGame.id),
						eq(loteriaPlantilla.playerId, playerId),
					),
				});
				if (card) {
					console.log('card to check', card);
					await db
						.update(loteriaPlantilla)
						.set({ checked: true })
						.where(
							and(
								eq(loteriaPlantilla.cardId, target),
								eq(loteriaPlantilla.playerId, playerId),
								eq(loteriaPlantilla.gameId, currentGame.id),
							),
						);

					const checks = await db.query.loteriaPlantilla.findMany({
						where: and(
							eq(loteriaPlantilla.checked, false),
							eq(loteriaPlantilla.playerId, playerId),
							eq(loteriaPlantilla.gameId, currentGame.id),
						),
					});

					return checks.length;
				}
			}
		}
	}
	return undefined;
};

export const addWinnerLoteria = async (playerId: string) => {
	const currentGame = await getCurrentGameLoteria();
	if (currentGame) {
		const winners = await db.query.loteriaWinners.findMany({
			where: eq(loteriaWinners.gameId, currentGame.id),
		});
		console.log('addWinnerLoteria.winners', winners);

		if (winners.length < 3) {
			await db.insert(loteriaWinners).values({
				gameId: currentGame.id,
				place: winners.length + 1,
				playerId,
			});
			console.log('addWinnerLoteria.return', winners.length + 1);
			return winners.length + 1;
		}
		return -1;
	}
	return -1;
};

export const isPlayLoteriaGame = async () => {
	const currentGame = await getCurrentGameLoteria();
	if (currentGame) {
		await db
			.update(loteriaGame)
			.set({ isPaused: false })
			.where(eq(loteriaGame.id, currentGame.id));
	}
};

export const toggleLoteriaGame = async () => {
	const currentGame = await getCurrentGameLoteria();
	if (currentGame) {
		await db
			.update(loteriaGame)
			.set({ isPaused: !currentGame.isPaused })
			.where(eq(loteriaGame.id, currentGame.id));
	}
};

export const finishGameLoteria = async () => {
	const currentGame = await getCurrentGameLoteria();
	if (currentGame) {
		await db.update(loteriaGame).set({ state: 'finish' });
		return true;
	}
	return false;
};

export const placeWinning = async (player: string) => {
	const currentGame = await getCurrentGameLoteria();
	if (currentGame) {
		const playerPlace = await db.query.loteriaWinners.findFirst({
			where: and(
				eq(loteriaWinners.gameId, currentGame.id),
				eq(loteriaWinners.playerId, player),
			),
		});
		if (playerPlace) {
			return playerPlace.place;
		}
	}
	return 0;
};

export const getWinners = async () => {
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
		return [];
	}
	const winners = await db.query.loteriaWinners.findMany({
		columns: {},
		with: {
			player: {
				columns: {
					id: true,
					nickName: true,
				},
			},
		},
		orderBy: asc(loteriaWinners.place),
		where: eq(loteriaWinners.gameId, currentGame.id),
	});
	return winners;
};
