import {
	type LoteriaIONamesapce,
	type LoteriaServerSocket,
} from 'anime-sockets-types';

import {
	addWinnerLoteria,
	checkCellCardGameLoteria,
	finishGameLoteria,
	getOnlinePlayersGameLoteria,
	getWinners,
	goToLobbyGameLoteria,
	isPlayLoteriaGame,
	nextCardGameLoteria,
	setOnlinePlayerLoteria,
	startGameLoteria,
} from '../controllers/loteria';
import { sleep } from '../lib/utils';
import { TimeManager } from '../TimerManager';

interface Event {
	(loteria: LoteriaIONamesapce, socket: LoteriaServerSocket): void;
}
interface CheckEvent {
	(
		loteria: LoteriaIONamesapce,
		socket: LoteriaServerSocket,
		target: string,
	): void;
}

export const loteriaStartGameEvent: Event = async (loteria, socket) => {
	if (socket.data.role === 'admin') {
		const start = await startGameLoteria();
		if (start) {
			loteria.emit('startCountdown', 10);
			loteria.emit('showCountdownDialog', true);
			await sleep(750);
			for (let countdown = 9; countdown >= 1; countdown--) {
				loteria.emit('preAnimeCountdown');
				await sleep(250);
				loteria.emit('countdown', countdown);
				await sleep(750);
			}
			loteria.emit('showCountdownDialog', false);
			loteria.emit('gameState', 'play');
			// const task = TimeManager.getInstance().getTask();
			// await isPlayLoteriaGame();
			// task?.start();
			// loteria.emit('isPausedGame', false);
		}
	}
};

export const loteriaDisconnectEvent: Event = async (loteria, socket) => {
	await setOnlinePlayerLoteria(socket.data.userId, false);
	const players = await getOnlinePlayersGameLoteria();
	loteria.emit('leavePlayer');
	loteria.emit('players', players);
	if (players.length === 0) {
		console.log('No players playing stop task nextCard');
		const task = TimeManager.getInstance().getTask();
		task?.stop();
	}
};

export const loteriaGameCreatedEvent: Event = async (loteria, socket) => {
	if (socket.data.role === 'admin') {
		loteria.emit('gameState', 'lobby');
	}
};

export const loteriaTogglePauseGameEvent: Event = async (loteria, socket) => {
	const task = TimeManager.getInstance().getTask();
	if (socket.data.role === 'admin' && task) {
		task.togglePause();
		await isPlayLoteriaGame();
		loteria.emit('isPausedGame', task.isPaused());
	}
};

export const loteriaGoToLobbyGameEvent: Event = async (loteria, socket) => {
	if (socket.data.role === 'admin') {
		await goToLobbyGameLoteria();
		loteria.emit('gameState', 'lobby');
	}
};

export const loteriaNextCardEvent: Event = async (loteria, socket) => {
	if (socket.data.role === 'admin') {
		const task = TimeManager.getInstance().getTask();

		const res = await nextCardGameLoteria();
		if (res) {
			const [indexAdmin, indexPlayer] = res;
			task?.reset();
			loteria.emit('updateCurrentCard', indexAdmin);
			loteria.emit('playerCurrentCard', indexPlayer);
			loteria.emit('isPausedGame', false);
		} else {
			task?.cancelInterval();
			await finishGameLoteria();
			loteria.emit('gameState', 'finish');
		}
	}
};

export const loteriaCheckCardEvent: CheckEvent = async (
	loteria,
	socket,
	target,
) => {
	if (socket.data.role === 'player') {
		const res = await checkCellCardGameLoteria(socket.data.userId, target);
		if (res !== undefined) {
			socket.emit('checkCardPlayer', target);

			if (res === 0) {
				const place = await addWinnerLoteria(socket.data.userId);

				console.log('player winner', place);

				if (place > 0) {
					const winnersList = await getWinners();
					if (place < 4) {
						socket.emit('winner', place);
						socket.broadcast.emit('winnersList', winnersList);
					} else {
						loteria.emit('winnersList', winnersList);
					}
				}
			}
		}
	}
};
