// import { type LoteriaServerSocket } from 'anime-sockets-types';

// import { joinGuestToLoteria, joinUserToLoteria } from '../controllers/loteria';

// export const joinGuest = async (socket: LoteriaServerSocket, nick: string) => {
// 	const res = await joinGuestToLoteria(nick);
// 	if (!res.ok) {
// 		socket.emit('joinError', res.error);
// 	}
// };

// export const joinUser = async (socket: LoteriaServerSocket, id: string) => {
// 	const res = await joinUserToLoteria(id);
// 	if (!res.ok) {
// 		socket.emit('joinError', res.error);
// 	}
// };
