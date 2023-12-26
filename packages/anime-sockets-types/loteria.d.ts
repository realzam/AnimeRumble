import { type Namespace, type Socket } from "socket.io";
import { type Socket as SocketClient } from "socket.io-client";

interface LoteriaSpecificInterServerEvents {}

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
  joinPlayer: () => void;
  leavePlayer: () => void;
  players: (players: string[]) => void;
  gameState: (status: "lobby" | "play" | "finish") => void;
  startCountdown: (value: number) => void;
  countdown: (value: number) => void;
  preAnimeCountdown: () => void;
  showCountdownDialog: () => void;
  closeCountdownDialog: () => void;
  updateCurrentCard: (index: number) => void;
}
export interface LoteriaClientToServerEvents {
  startGame: () => void;
  goToLobbyGame: () => void;
  nextCard: () => void;
}

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
