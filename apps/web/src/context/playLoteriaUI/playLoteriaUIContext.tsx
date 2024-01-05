import { createContext } from 'react';
import {
	type ObservableArray,
	type ObservableComputed,
	type ObservableObject,
	type ObservablePrimitive,
} from '@legendapp/state';
import { type AudioPlayer } from 'react-use-audio-player';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';

import { type RactivesMarkedRecord } from '../playLoteria/playLoteriaContext';

export type TypeCardsSearch = LoteriaCardsDataType[0] & {
	titleSearch: string;
	disable: boolean;
};

interface PlayLoteriaUI {
	soundCounter: AudioPlayer;
	showCountdownDialog: ObservablePrimitive<boolean>;
	showEditPlantillaDialog: ObservablePrimitive<boolean>;
	showLoteriaWinnerDialog: ObservablePrimitive<boolean>;
	placeWinning: ObservablePrimitive<number>;
	playersList: ObservableArray<string[]>;
	isGenerationRandomTable: ObservablePrimitive<boolean>;
	plantilla: ObservableArray<LoteriaCardsDataType>;
	plantillaChecks: ObservableObject<RactivesMarkedRecord>;
	allowEditPlantilla: ObservableComputed<boolean>;
	isPlaying: ObservableComputed<boolean>;
	allCardsSearch: ObservableArray<TypeCardsSearch[]>;

	generateRandomTable: () => void;
	openEditPlantillaDialog: (id: string) => void;
	closeEditPlantillaDialog: () => void;
	editCardPlantilla: (id: string) => void;
}

export const PlayLoteriaUIContext = createContext<PlayLoteriaUI | null>(null);
