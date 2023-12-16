import { type Namespace, type Socket } from "socket.io";
import { type Socket as SocketClient } from "socket.io-client";

interface LoteriaSpecificInterServerEvents {
  // ...
}

interface LoteriaSpecificSocketData {
  userId: string;
  role: "player" | "admin";
  // 	nick: string;
  // 	id: string;
  // 	typeUser: 'register' | 'guest';
}

export type TypeIsRoomCreated =
  | {
      created: false;
    }
  | {
      created: true;
      status: "lobby" | "play" | "finish";
    };
export interface LoteriaServerToClientEvents {
  invalidToken: () => void;
  players: (players: string[]) => void;
}
export interface LoteriaClientToServerEvents {}

export type LoteriaIONamesapce = Namespace<
  LoteriaClientToServerEvents,
  LoteriaServerToClientEvents,
  LoteriaSpecificInterServerEvents,
  LoteriaSpecificSocketData
>;

export type LoteriaServerSocket = Socket<
  LoteriaClientToServerEvents,
  LoteriaServerToClientEvents,
  LoteriaSpecificInterServerEvents,
  LoteriaSpecificSocketData
>;

export type LoteriaClientSocket = SocketClient<
  LoteriaServerToClientEvents,
  LoteriaClientToServerEvents
>;
