import { createContext } from 'react';
import {
	type ObservableArray,
	type ObservableObject,
	type ObservablePrimitive,
} from '@legendapp/state';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';
import { type TypeLoteriaRandomQueryProps } from '@/types/rumbleQuery';

export type SearchCard = LoteriaCardsDataType[0] & {
	titleSearch: string;
	disable: boolean;
	index: number;
};
export type RactivesMarkedRecord = Record<string, boolean>;

interface State {
	allCards: LoteriaCardsDataType;
	// currentCards: LoteriaCardsDataType;
	searchList: SearchCard[];
	currentCards: ObservableArray<LoteriaCardsDataType>;
	playMode: ObservablePrimitive<boolean>;
	props: ObservableObject<TypeLoteriaRandomQueryProps>;
	ractivesMarked: ObservableObject<RactivesMarkedRecord>;
	replaceCard: (from: string, to: string) => void;
	generateRandomCards: () => void;
	clearPlantilla: () => void;
	toggleActiveCard: (key: string) => void;
}

export const PlayLoteriaContext = createContext<State | null>(null);
