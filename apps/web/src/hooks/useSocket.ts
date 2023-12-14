'use  client';

import { useCallback, useEffect, useState } from 'react';
import {
	type AnimeDeafultSocketClient,
	type AnimeSocketsClient,
	type AnimeSocketsRooms,
} from 'anime-sockets-types';
import { io } from 'socket.io-client';

interface Props {
	room: AnimeSocketsRooms;
	onConnect?: () => void;
	onDisconnect?: () => void;
	token?: string;
	autoConnect?: boolean;
}

/*

	const URL = process.env.NODE_ENV === 'production'
			? 'https://socket.anime-rumble.com/'
			: 'http://localhost:4000/';
			
*/
const useSocket = <
	T extends AnimeSocketsClient | null = AnimeDeafultSocketClient,
>({
	onConnect,
	onDisconnect,
}: Props) => {
	const [socket, setSocket] = useState<AnimeDeafultSocketClient | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	const conectarSocket = useCallback(() => {
		const token =
			typeof window !== 'undefined'
				? window.localStorage.getItem('anime.player')
				: undefined;

		const socketTemp = io('http://localhost:4000/loteria', {
			transports: ['websocket', 'polling'],
			autoConnect: true,
			forceNew: true,
			query: {
				'x-token': token,
			},
		});
		setSocket(socketTemp);
	}, []);

	const desconectarSocket = useCallback(() => {
		socket?.disconnect();
	}, [socket]);

	// useEffect(() => {
	// 	if (autoConnect) {
	// 		const query = {
	// 			'x-token': token,
	// 		};
	// 		const socketInstance: AnimeDeafultSocketClient = io(
	// 			'http://localhost:4000/loteria',
	// 			{
	// 				transports: ['websocket', 'polling'],
	// 				autoConnect: true,
	// 				forceNew: true,
	// 				query: token ? query : undefined,
	// 			},
	// 		);

	// 		setSocket(socketInstance);
	// 	}
	// 	return () => {
	// 		socket?.disconnect();
	// 	};
	// }, [URL, setSocket, room, token, autoConnect]);

	useEffect(() => {
		socket?.on('connect', () => {
			console.log('useSocket.connect');

			setIsConnected(true);
			onConnect?.();
		});
	}, [socket, onConnect]);

	useEffect(() => {
		socket?.on('disconnect', () => {
			setIsConnected(false);
			onDisconnect?.();
		});
	}, [socket, onDisconnect]);

	return {
		isConnected,
		socket: socket as T | null,
		conectarSocket,
		desconectarSocket,
	};
};

export default useSocket;
