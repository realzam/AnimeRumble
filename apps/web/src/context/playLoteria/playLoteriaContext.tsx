import { createContext } from 'react';
import { type Observable, type ObservablePrimitive } from '@legendapp/state';
import { type loteriaGame } from 'anime-db';
import { type LoteriaClientSocket } from 'anime-sockets-types';

import {
	type LoteriaCardsDataType,
	type LoteriaCurrentGameDataType,
} from '@/types/loteriaQuery';

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
	jwt: string;
}

export type RactivesMarkedRecord = Record<string, boolean>;

interface PlayLoteriaState {
	socket: LoteriaClientSocket | null;
	stateGame: ObservablePrimitive<TypeStateGame>;
	userInfo: Observable<TypeUserInfo | undefined>;
	cardsPlayer: LoteriaCardsDataType;
	allCards: LoteriaCardsDataType;
	initialGame: LoteriaCurrentGameDataType;
	initialReactives: RactivesMarkedRecord;
	login: (
		jwt: string,
		playerCards: LoteriaCardsDataType,
		reactive: RactivesMarkedRecord,
	) => void;
}

export const PlayLoteriaContext = createContext<PlayLoteriaState | null>(null);
