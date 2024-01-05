'use client';

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

const useSocket = <
	T extends AnimeSocketsClient | null = AnimeDeafultSocketClient,
>({
	onConnect,
	onDisconnect,
	room,
	autoConnect = false,
}: Props) => {
	const [socket, setSocket] = useState<AnimeDeafultSocketClient | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	const conectarSocket = useCallback(() => {
		const token =
			typeof window !== 'undefined'
				? window.localStorage.getItem('anime.player')
				: undefined;

		const URL = `https://socket.anime-rumble.com/${room}`;
		const socketTemp = io(URL, {
			transports: ['websocket', 'polling'],
			autoConnect: true,
			forceNew: true,
			query: {
				'x-token': token,
			},
		});
		setSocket(socketTemp);
	}, [room]);

	const desconectarSocket = useCallback(() => {
		socket?.disconnect();
	}, [socket]);

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

	useEffect(() => {
		if (autoConnect) {
			conectarSocket();
		}
	}, [autoConnect, conectarSocket]);

	return {
		isConnected,
		socket: socket as T | null,
		conectarSocket,
		desconectarSocket,
	};
};

export default useSocket;
