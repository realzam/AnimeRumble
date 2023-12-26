import { createContext } from 'react';
import { type Observable, type ObservablePrimitive } from '@legendapp/state';
import { type loteriaGame } from 'anime-db';
import { type LoteriaClientSocket } from 'anime-sockets-types';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';

export type TypeLoteriaGameTableState = typeof loteriaGame.$inferSelect.state;

export type TypeStateGameUI =
	| 'initializing'
	| 'waitSocketStartup'
	| 'waitToRoom'
	| 'nickNameForm';

export type TypeStateGame = TypeStateGameUI | TypeLoteriaGameTableState;
export interface TypeUserInfo {
	userId: string;
	nickname?: string | null;
}

export type RactivesMarkedRecord = Record<string, boolean>;

interface State {
	socket: LoteriaClientSocket | null;
	stateGame: ObservablePrimitive<TypeStateGame>;
	userInfo: Observable<TypeUserInfo | undefined>;
	allCards: LoteriaCardsDataType;
	cardsPlayer: LoteriaCardsDataType;
	playersOnline: string[];
	login: (jwt: string, playerCards: LoteriaCardsDataType) => void;
}

export const PlayLoteriaContext = createContext<State | null>(null);
