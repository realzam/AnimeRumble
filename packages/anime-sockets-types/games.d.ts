import { LoteriaClientSocket } from "./loteria";
import { BingoClientSocket } from "./bingo";

export type AnimeSocketsClient = LoteriaClientSocket | BingoClientSocket;

export type AnimeSocketsRooms = "loteria" | "bingo" | "waitRoom";
