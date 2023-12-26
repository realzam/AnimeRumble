import {
	type LoteriaIONamesapce,
	type LoteriaServerSocket,
} from 'anime-sockets-types';

import { startGameLoteria } from '../controllers/loteria';
import { sleep } from '../lib/utils';

export const startGameEvent = async (
	loteria: LoteriaIONamesapce,
	socket: LoteriaServerSocket,
) => {
	if (socket.data.role === 'admin') {
		await startGameLoteria();
		loteria.emit('startCountdown', 10);
		loteria.emit('showCountdownDialog');
		await sleep(750);
		for (let countdown = 9; countdown >= 1; countdown--) {
			loteria.emit('preAnimeCountdown');
			await sleep(250);
			loteria.emit('countdown', countdown);
			await sleep(750);
		}
		loteria.emit('closeCountdownDialog');
		loteria.emit('gameState', 'play');
	}
};
