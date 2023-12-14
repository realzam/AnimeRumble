import { createContext } from 'react';
import { type ObservableObject } from '@legendapp/state';
import { type UseBaseQueryResult } from '@tanstack/react-query';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';

export interface UiType {
	page: number;
	totalPages: number;
	CardsByPage: number;
}

type QQ = UseBaseQueryResult<LoteriaCardsDataType, unknown>;
interface State {
	cards: ObservableObject<LoteriaCardsDataType>;
	props$: ObservableObject<Omit<QQ, 'data'>>;
	refForm: React.MutableRefObject<HTMLDivElement | null>;
	ui: ObservableObject<UiType>;
}

export const LoteriaInfoAdminContex = createContext<State | null>(null);
