import {
	type LoteriaIONamesapce,
	type LoteriaServerSocket,
} from 'anime-sockets-types';
import { jwtVerify } from 'jose';
import { type Server } from 'socket.io';

import {
	finishGameLoteria,
	getOnlinePlayersGameLoteria,
	getWinners,
	nextCardGameLoteria,
	placeWinning,
	setOnlinePlayerLoteria,
} from '../controllers/loteria';
import {
	loteriaCheckCardEvent,
	loteriaDisconnectEvent,
	loteriaGameCreatedEvent,
	loteriaGoToLobbyGameEvent,
	loteriaNextCardEvent,
	loteriaStartGameEvent,
	loteriaTogglePauseGameEvent,
} from '../event/loteria';
import { sleep } from '../lib/utils';
import { LoteriaTask, TimeManager } from '../TimerManager';
import { type JwtAnimePlayer } from '../types/jwt';

const joinPlayer = async (
	loteria: LoteriaIONamesapce,
	socket: LoteriaServerSocket,
) => {
	await setOnlinePlayerLoteria(socket.data.userId, true);
	loteria.emit('joinPlayer');
	const task = TimeManager.getInstance().getTask();
	socket.emit('updateProgress', task?.getProgress() || 0);
	const place = await placeWinning(socket.data.userId);
	if (place > 0) {
		socket.emit('winner', place);
	}
	const winners = await getWinners();
	socket.emit('winnersList', winners);
};

const loteriaSocket = async (io: Server): Promise<void> => {
	const loteria: LoteriaIONamesapce = io.of('/loteria');

	const loteriaTask = new LoteriaTask(
		loteria,
		async () => {
			console.log('call nextCardLoteriaTask from startGame');
			const res = await nextCardGameLoteria();
			if (res) {
				const [indexAdmin, indexPlayer] = res;
				loteria.emit('updateCurrentCard', indexAdmin);
				loteria.emit('playerCurrentCard', indexPlayer);
				await sleep(600);
			} else {
				await finishGameLoteria();
				loteria.emit('gameState', 'finish');
			}
		},
		10 * 1000,
	);
	const tm = TimeManager.getInstance();
	tm.setTask(loteriaTask);

	loteria.use(async (socket, next) => {
		const token = socket.handshake.query['x-token'] as string;
		const secret = new TextEncoder().encode(process.env.SECRET_JWT_SOCKET);

		try {
			const { payload } = await jwtVerify<JwtAnimePlayer>(token, secret);
			console.log('payload ok', payload);
			socket.data.userId = payload.id;
			socket.data.role = payload.role;
			next();
		} catch (error) {
			console.log('not authorized');

			const err = new Error('not authorized');
			next(err);
		}
	});

	loteria.on('connection', async (socket: LoteriaServerSocket) => {
		await joinPlayer(loteria, socket);
		loteria.emit('players', await getOnlinePlayersGameLoteria());

		socket.on('disconnect', () => loteriaDisconnectEvent(loteria, socket));

		socket.on('startGame', () => loteriaStartGameEvent(loteria, socket));

		socket.on('goToLobbyGame', () =>
			loteriaGoToLobbyGameEvent(loteria, socket),
		);
		socket.on('gameCreated', () => loteriaGameCreatedEvent(loteria, socket));
		socket.on('togglePause', () =>
			loteriaTogglePauseGameEvent(loteria, socket),
		);

		socket.on('nextCard', () => loteriaNextCardEvent(loteria, socket));

		socket.on('checkCard', (target: string) => {
			loteriaCheckCardEvent(loteria, socket, target);
		});
	});
};

export { loteriaSocket };
