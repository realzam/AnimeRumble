import http from 'http';
import cors from 'cors';
import express from 'express';
import moment from 'moment';
import momentTZ from 'moment-timezone';
import { Server as ServerIO } from 'socket.io';

import { setOfflineAllUsers } from './controllers/loteria';
import { getQuizzes, setFinishQuiz } from './controllers/quizzes';
import { defaultSocket } from './sockets/default';
import { loteriaSocket } from './sockets/loteria';
import { waitRoomSocket } from './sockets/waitRoom';

class Server {
	private app = express();

	private port = process.env.PORT || 4000;

	private server = http.createServer(this.app);

	private io = new ServerIO(this.server, {
		cors: {
			origin:
				process.env.NODE_ENV === 'production'
					? 'https://www.anime-rumble.com'
					: '*',
		},
		transports: ['websocket', 'polling'],
	});

	public execute() {
		this.middlewares();
		this.server.listen(this.port, () => {
			console.log(`Server correindo en puerto: ${this.port}`);
		});
		this.startQuizTimers();
		this.configSockets();
	}

	private async startQuizTimers() {
		const quizzes = await getQuizzes();
		const now = momentTZ().tz('America/Mexico_City');
		console.log(now.format());

		quizzes.forEach((quiz) => {
			const nowQuiz = new Date(
				momentTZ().tz('America/Mexico_City').format('YYYY-MM-DD HH:mm:ss'),
			);
			const end = new Date(moment(quiz.endQuiz).format());

			const res = end.getTime() - nowQuiz.getTime();
			console.log('start timer for quiz', quiz.title, 'ends:', quiz.endQuiz);

			setTimeout(() => {
				console.log('finish quiz', quiz.title);
				setFinishQuiz(quiz.id);
			}, res);
		});
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

	private async configSockets() {
		await setOfflineAllUsers();
		waitRoomSocket(this.io);
		loteriaSocket(this.io);
		defaultSocket(this.io);
	}
}

export default Server;
