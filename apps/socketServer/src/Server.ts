import http from 'http';
import cors from 'cors';
import express from 'express';
import { Server as ServerIO } from 'socket.io';

import { defaultSocket } from './sockets/default';
import { loteriaSocket } from './sockets/loteria';

class Server {
	private app = express();

	private port = process.env.PORT || 4000;

	private server = http.createServer(this.app);

	private io = new ServerIO(this.server, {
		cors: {
			origin: '*',
		},
		transports: ['websocket', 'polling'],
	});

	public execute() {
		this.middlewares();
		this.server.listen(this.port, () => {
			console.log(`Server correindo en puerto: ${this.port}`);
		});
		this.configurarSockets();
		// dbConnection();
	}

	private middlewares() {
		// CORS
		this.app.use(cors());
		// Parsebody
		this.app.use(express.json());
		// this.app.use(errorHandleMiddleware);
		// this.app.use(express.urlencoded());
		// Routers
		// this.app.use('/api', routerBase);
		// 404 Controller
		// this.app.use(notFound);
	}

	private configurarSockets() {
		loteriaSocket(this.io);
		defaultSocket(this.io);
	}
}

export default Server;
