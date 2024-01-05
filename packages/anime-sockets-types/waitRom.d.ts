import { type Namespace, type Socket } from "socket.io";
import { type Socket as SocketClient } from "socket.io-client";

interface WaitRoomSpecificInterServerEvents {}

interface WaitRoomSpecificSocketData {
  userId?: string;
  role?: "player" | "admin";
}

interface WaitRoomServerToClientEvents {
  loteriaRoomCreated: () => void;
  bingoRoomCreated: () => void;
}
interface WaitRoomClientToServerEvents {
  createLoteria: () => void;
}

export type WaitRoomIONamesapce = Namespace<
  WaitRoomClientToServerEvents,
  WaitRoomServerToClientEvents,
  WaitRoomSpecificInterServerEvents,
  WaitRoomSpecificSocketData
>;

export type WaitRoomServerSocket = Socket<
  WaitRoomClientToServerEvents,
  WaitRoomServerToClientEvents,
  WaitRoomSpecificInterServerEvents,
  WaitRoomSpecificSocketData
>;

export type WaitRoomClientSocket = SocketClient<
  WaitRoomServerToClientEvents,
  WaitRoomClientToServerEvents
>;
