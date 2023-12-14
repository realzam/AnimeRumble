import { type Namespace, type Socket } from "socket.io";
import { type Socket as SocketClient } from "socket.io-client";

interface BingoServerToClientEvents {
  welcome: (msg: string) => void;
}
interface BingoClientToServerEvents {}

export type BingoIONamesapce = Namespace<
  BingoClientToServerEvents,
  BingoServerToClientEvents
>;

export type BingoServerSocket = Socket<
  BingoClientToServerEvents,
  BingoServerToClientEvents
>;

export type BingoClientSocket = SocketClient<
  BingoServerToClientEvents,
  BingoClientToServerEvents
>;
