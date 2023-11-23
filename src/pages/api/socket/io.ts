import { type Server as NetServer } from 'http';
import { type NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';

import { type NextApiResponseServerIo } from '@/types/socket';

export const config = {
	api: {
		bodyParser: false,
	},
};

const ioHandle = (_: NextApiRequest, res: NextApiResponseServerIo) => {
	if (!res.socket.server.io) {
		const path = '/api/socket/io';
		const httpServer: NetServer = res.socket.server as unknown as NetServer;
		const io = new ServerIO(httpServer, {
			path,
			addTrailingSlash: false,
		});
		res.socket.server.io = io;
	}
	res.end();
};

export default ioHandle;
