import { createContext } from 'react';
import { type Observable, type ObservablePrimitive } from '@legendapp/state';

export type TypeStateGame =
	| 'initializing'
	| 'waitSocketStartup'
	| 'waitToRoom'
	| 'nickNameForm'
	| 'lobby'
	| 'finish'
	| 'play';
export interface TypeUserInfo {
	userId: string;
	nickname?: string | null;
}

export type RactivesMarkedRecord = Record<string, boolean>;

interface State {
	stateGame: ObservablePrimitive<TypeStateGame>;
	userInfo: Observable<TypeUserInfo | undefined>;
	login: (jwt: string) => void;
}

export const PlayLoteriaContext = createContext<State | null>(null);
