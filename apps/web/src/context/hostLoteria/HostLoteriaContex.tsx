import { createContext } from 'react';
import { type ObservablePrimitive } from '@legendapp/state';

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
	playersList: string[];
	currentCard: number;
	startGame: () => void;
	goToLobbyGame: () => void;
	nextCard: () => void;
}

export const HostLoteriaIContext = createContext<State | null>(null);
