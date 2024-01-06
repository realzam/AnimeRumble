import { createContext } from 'react';
import {
	type ObservableArray,
	type ObservablePrimitive,
} from '@legendapp/state';
import { type TypeWinners } from 'anime-sockets-types';

import {
	type LoteriaCardsDataType,
	type LoteriaStartLoteriaHostDataType,
} from '@/types/loteriaQuery';

import { type TypeStateGame } from '../playLoteria/playLoteriaContext';

interface State {
	stateGame: ObservablePrimitive<TypeStateGame>;
	game: LoteriaStartLoteriaHostDataType['game'];
	cardsPassed: LoteriaCardsDataType;
	cardsMissed: LoteriaCardsDataType;
	cards: LoteriaCardsDataType;
	playersList: string[];
	currentCard: number;
	isPaused: boolean;
	updateProgress: ObservablePrimitive<number>;
	winnersList: ObservableArray<TypeWinners>;

	startGame: () => void;
	goToLobbyGame: () => void;
	nextCard: () => void;
	togglePauseLoteria: () => void;
}

export const HostLoteriaIContext = createContext<State | null>(null);
