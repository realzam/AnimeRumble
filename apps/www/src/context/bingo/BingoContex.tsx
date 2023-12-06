'use client';

import { createContext } from 'react';
import { type ObservableObject } from '@legendapp/state';
import { type UseBaseQueryResult } from '@tanstack/react-query';

import { type BingoReactivesDataType } from '@/types/bingoQuery';

// export interface UiType {
// 	ractivesMarked: boolean[];
// }

type QQ = UseBaseQueryResult<BingoReactivesDataType, unknown>;
interface State {
	// id: string;
	reactives: ObservableObject<BingoReactivesDataType>;
	props$: ObservableObject<Omit<QQ, 'data'>>;
	// ui: ObservableObject<UiType>;
	// setQuestionUi: (id: string) => void;
	// setQuestionUiAfterDelete: () => void;
}

export const BingoContex = createContext<State | null>(null);
