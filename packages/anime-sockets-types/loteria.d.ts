import { type Namespace, type Socket } from "socket.io";
import { type Socket as SocketClient } from "socket.io-client";

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
}
export interface LoteriaClientToServerEvents {}

export type LoteriaIONamesapce = Namespace<
  LoteriaClientToServerEvents,
  LoteriaServerToClientEvents
>;

export type LoteriaServerSocket = Socket<
  LoteriaClientToServerEvents,
  LoteriaServerToClientEvents
>;

export type LoteriaClientSocket = SocketClient<
  LoteriaServerToClientEvents,
  LoteriaClientToServerEvents
>;
