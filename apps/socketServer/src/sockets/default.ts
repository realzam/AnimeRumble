import { type Server } from 'socket.io';

const defaultSocket = async (io: Server): Promise<void> => {
	const main = io.of('/');

	main.on('connect', () => {
		console.log('client connect to server');
	});
};

export { defaultSocket };
