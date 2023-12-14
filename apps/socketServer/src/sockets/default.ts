import { type Server } from 'socket.io';

const defaultSocket = async (io: Server): Promise<void> => {
	io.on('connect', () => {
		console.log('client connect to server');
	});
};

export { defaultSocket };
