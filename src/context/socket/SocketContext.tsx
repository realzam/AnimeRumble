import { createContext } from 'react';
import { type Socket } from 'socket.io-client';

import {
	type ClientToServerEvents,
	type ServerToClientEvents,
} from '@/types/socket';

interface SocketContextType {
	socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
	isConnected: boolean;
}

export const SocketContext = createContext<SocketContextType | null>(null);
