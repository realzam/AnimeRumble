'use client';

import { createContext } from 'react';
import { type ObservablePrimitive } from '@legendapp/state';

export type StatesPlayLoteria = 'showLobby' | 'showEnd';

interface State {
	stateLoteria: ObservablePrimitive<StatesPlayLoteria>;
}

export const PlayLoteriaAdminContext = createContext<State | null>(null);
