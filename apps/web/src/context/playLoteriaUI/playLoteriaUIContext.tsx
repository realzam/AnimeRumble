import { createContext } from 'react';
import {
	type ObservableArray,
	type ObservableComputed,
	type ObservableObject,
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
	playersList: string[];
	allCards: LoteriaCardsDataType;
	searchList: SearchCard[];
	currentCards: ObservableArray<LoteriaCardsDataType>;
	props: ObservableObject<TypeLoteriaRandomQueryProps>;
	ractivesMarked: ObservableObject<RactivesMarkedRecord>;
	playMode: ObservableComputed<boolean>;
	isOpenChangeCardDialog: boolean;
	openChangeCardDialog: (id: string) => void;
	closeChangeCardDialog: () => void;
	replaceCard: (to: string) => void;
	generateRandomCards: () => void;
	clearPlantilla: () => void;
	toggleActiveCard: (key: string) => void;
}

export const PlayLoteriaUIContext = createContext<State | null>(null);
