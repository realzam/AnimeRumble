import { type Socket as SocketClient } from "socket.io-client";
import { type Server } from "socket.io";

export interface DefaultServerToClientEvents {}
export interface DefaultClientToServerEvents {}

export type AnimeDeafultSocketServer = SocketClient<
  DefaultClientToServerEvents,
  DefaultServerToClientEvents
>;

export type AnimeDeafultSocketClient = SocketClient<
  DefaultClientToServerEvents,
  DefaultServerToClientEvents
>;
