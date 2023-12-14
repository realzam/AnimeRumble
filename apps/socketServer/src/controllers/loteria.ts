import { db, loteriaGame, playerLoteria, users } from 'anime-db';
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

export const joinGuestToLoteria = async (
	nickName: string,
): Promise<Response> => {
	const currentGame = await getCurrentGameLoteria();
	if (!currentGame) {
		return {
			ok: false,
			error: 'No existe sala a unirse',
		};
	}
	const gameId = currentGame.id;

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
		return {
			ok: false,
			error: 'El nickName ya esta en uso, escoge otro',
		};
	}

	const userId = nanoid(40);
	await db.insert(playerLoteria).values({
		gameId,
		nickName,
		userId,
		userType: 'guest',
	});

	return { ok: true };
};

export const joinUserToLoteria = async (userId: string): Promise<Response> => {
	const currentGame = await getCurrentGameLoteria();
	if (!currentGame) {
		return {
			ok: false,
			error: 'No exste sala a unirse',
		};
	}
	const gameId = currentGame.id;

	const user = await db.query.users.findFirst({
		where: eq(users.id, userId),
	});

	if (!user) {
		return {
			ok: false,
			error: 'No existe usuario',
		};
	}

	await db.insert(playerLoteria).values({
		gameId,
		nickName: user.nickName!,
		userId,
		userType: 'guest',
	});

	return { ok: true };
};
