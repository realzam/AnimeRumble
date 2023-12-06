'use client';

import React, { useEffect, useState } from 'react';
import { io as ClientIO, type Socket } from 'socket.io-client';

import {
	type ClientToServerEvents,
	type ServerToClientEvents,
} from '@/types/socket';

import { SocketContext } from './SocketContext';

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [socket, setSocket] = useState<Socket<
		ServerToClientEvents,
		ClientToServerEvents
	> | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		const socketInstance: Socket<ServerToClientEvents, ClientToServerEvents> =
			ClientIO(process.env.NEXTAUTH_URL!, {
				path: '/api/socket/io',
				addTrailingSlash: false,
			});

		socketInstance.on('connect', () => {
			setIsConnected(true);
		});

		socketInstance.on('disconnect', () => {
			setIsConnected(false);
		});

		setSocket(socketInstance);

		return () => {
			socketInstance.disconnect();
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket, isConnected }}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
