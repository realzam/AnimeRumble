import { db, loteriaGame, playerLoteria } from 'anime-db';
import { and, eq, ne } from 'drizzle-orm';
import { nanoid } from 'nanoid';

type Response =
	| {
			ok: true;
	  }
	| {
			ok: false;
			error: string;
	  };
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
	const players = await db.query.playerLoteria.findMany({
		where: and(
			eq(playerLoteria.gameId, currentGame.id),
			eq(playerLoteria.online, true),
		),
	});
	return players.map((p) => p.nickName);
};

export const setOnlinePlayerLoteria = async (id: string, online: boolean) => {
	const currentGame = await getCurrentGameLoteria();
	if (currentGame) {
		await db
			.update(playerLoteria)
			.set({ online })
			.where(eq(playerLoteria.userId, id));
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
		await db.update(loteriaGame).set({ state: 'lobby' });
		return true;
	}
	return false;
};

export const setOfflineAllUsers = async () => {
	await db.update(playerLoteria).set({ online: false });
};

export const nextCardGameLoteria = async () => {
	const currentGame = await getCurrentGameLoteria();
	if (currentGame) {
		await db
			.update(loteriaGame)
			.set({ currentCard: currentGame.currentCard + 1 });
		return currentGame.currentCard + 1;
	}
	return undefined;
};
