import {
	type LoteriaIONamesapce,
	type LoteriaServerSocket,
} from 'anime-sockets-types';
import { jwtVerify } from 'jose';
import { type Server } from 'socket.io';

import {
	getOnlinePlayersGameLoteria,
	setOnlinePlayerLoteria,
} from '../controllers/loteria';
import { type JwtAnimePlayer } from '../types/jwt';

const loteriaSocket = async (io: Server): Promise<void> => {
	const loteria: LoteriaIONamesapce = io.of('/loteria');

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
		loteria.emit('players', await getOnlinePlayersGameLoteria());
		// const currentGame = await getCurrentGameLoteria();
		// let info: TypeIsRoomCreated = {
		// 	created: false,
		// };
		// if (currentGame) {
		// 	info = {
		// 		created: true,
		// 		status: currentGame.state,
		// 	};
		// }
		// socket.emit('isRoomCreated', info);
		// socket.on('joinGuest', (nick) => joinGuest(socket, nick));
		// socket.on('joinUser', (id) => joinUser(socket, id));
		socket.on('disconnect', async () => {
			await setOnlinePlayerLoteria(socket.data.userId, false);
			loteria.emit('players', await getOnlinePlayersGameLoteria());
		});
	});
};

export { loteriaSocket };
