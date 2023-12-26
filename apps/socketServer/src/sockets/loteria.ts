import {
	type LoteriaIONamesapce,
	type LoteriaServerSocket,
} from 'anime-sockets-types';
import { jwtVerify } from 'jose';
import { type Server } from 'socket.io';

import {
	getOnlinePlayersGameLoteria,
	goToLobbyGameLoteria,
	nextCardGameLoteria,
	setOnlinePlayerLoteria,
} from '../controllers/loteria';
import { startGameEvent } from '../event/loteria';
import { type JwtAnimePlayer } from '../types/jwt';

const loteriaSocket = async (io: Server): Promise<void> => {
	const loteria: LoteriaIONamesapce = io.of('/loteria');
	loteria.sockets.forEach((e) => {
		console.log('sockets in loateria', e.data.userId);
	});

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
		console.log('client connect to loteria');
		await setOnlinePlayerLoteria(socket.data.userId, true);
		loteria.emit('joinPlayer');
		loteria.emit('players', await getOnlinePlayersGameLoteria());
		socket.on('disconnect', async () => {
			loteria.emit('leavePlayer');
			await setOnlinePlayerLoteria(socket.data.userId, false);
			loteria.emit('players', await getOnlinePlayersGameLoteria());
		});

		socket.on('startGame', () => startGameEvent(loteria, socket));
		socket.on('goToLobbyGame', async () => {
			if (socket.data.role === 'admin') {
				await goToLobbyGameLoteria();
				loteria.emit('gameState', 'lobby');
			}
		});

		socket.on('nextCard', async () => {
			if (socket.data.role === 'admin') {
				const index = await nextCardGameLoteria();
				if (index) {
					loteria.emit('updateCurrentCard', index);
				}
			}
		});
	});
};

export { loteriaSocket };
