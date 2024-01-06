import { type Namespace, type Socket } from "socket.io";
import { type Socket as SocketClient } from "socket.io-client";

interface LoteriaSpecificInterServerEvents {}

interface LoteriaSpecificSocketData {
  userId: string;
  role: "player" | "admin";
}

type TypeWinners = {
  player: {
    id: string;
    nickName: string;
  };
}[];

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
  joinPlayer: (_: void) => void;
  leavePlayer: (_: void) => void;
  players: (players: string[]) => void;
  gameState: (status: "lobby" | "play" | "finish") => void;
  startCountdown: (value: number) => void;
  countdown: (value: number) => void;
  preAnimeCountdown: (_: void) => void;
  showCountdownDialog: (show: boolean) => void;
  updateCurrentCard: (index: number) => void;
  playerCurrentCard: (index: number) => void;
  checkCardPlayer: (key: string) => void;
  winner: (place: number) => void;
  isPausedGame: (isPaused: boolean) => void;
  updateProgress: (value: number) => void;
  winnersList: (winners: TypeWinners) => void;
}
export interface LoteriaClientToServerEvents {
  startGame: () => void;
  goToLobbyGame: () => void;
  nextCard: () => void;
  checkCard: (target: string) => void;
  gameCreated: () => void;
  togglePause: () => void;
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
