import {
	type WaitRoomIONamesapce,
	type WaitRoomServerSocket,
} from 'anime-sockets-types';
import { jwtVerify } from 'jose';
import { type Server } from 'socket.io';

import { type JwtAnimePlayer } from '../types/jwt';

const waitRoomSocket = async (io: Server): Promise<void> => {
	const waitRoom: WaitRoomIONamesapce = io.of('/waitRoom');

	waitRoom.use(async (socket, next) => {
		const token = socket.handshake.query['x-token'] as string;
		const secret = new TextEncoder().encode(process.env.SECRET_JWT_SOCKET);

		try {
			const { payload } = await jwtVerify<JwtAnimePlayer>(token, secret);
			console.log('payload ok', payload);
			socket.data.userId = payload.id;
			socket.data.role = payload.role;
		} catch (_) {}
		next();
	});

	waitRoom.on('connect', async (socket: WaitRoomServerSocket) => {
		socket.on('createLoteria', () => {
			console.log('admin createLoteria, telling to everyone');
			if (socket.data.role && socket.data.role == 'admin') {
				console.log('admin createLoteria, telling to everyone');
				waitRoom.emit('loteriaRoomCreated');
			}
		});
	});
};

export { waitRoomSocket };
