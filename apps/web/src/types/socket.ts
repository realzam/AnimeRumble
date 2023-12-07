import { type Server as NetServer, type Socket } from 'net';
import { type NextApiResponse } from 'next';
import { type Server as SocketIOServer } from 'socket.io';

export type NextApiResponseServerIo = NextApiResponse & {
	socket: Socket & {
		server: NetServer & {
			io: SocketIOServer;
		};
	};
};

export interface ClientToServerEvents {
	noArg: () => void;
	basicEmit: (a: number, b: string, c: number[]) => void;
}

export interface ServerToClientEvents {
	withAck: (d: string, cb: (e: number) => void) => void;
}
