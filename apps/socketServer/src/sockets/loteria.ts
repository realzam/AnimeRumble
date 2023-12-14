import {
	type LoteriaIONamesapce,
	type LoteriaServerSocket,
} from 'anime-sockets-types';
import { jwtVerify } from 'jose';
import { type Server } from 'socket.io';

const loteriaSocket = async (io: Server): Promise<void> => {
	const loteria: LoteriaIONamesapce = io.of('/loteria');

	loteria.use(async (socket, next) => {
		const token = socket.handshake.query['x-token'] as string;
		const secret = new TextEncoder().encode(process.env.SECRET_JWT_SOCKET);

		try {
			const { payload } = await jwtVerify(token, secret);
			console.log('payload ok', payload);
			next();
		} catch (error) {
			const err = new Error('not authorized');
			next(err);
		}
	});

	loteria.on('connection', async (_: LoteriaServerSocket) => {
		console.log('client connect to loteria');
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
	});
};

export { loteriaSocket };
