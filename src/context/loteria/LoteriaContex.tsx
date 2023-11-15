import { createContext } from 'react';
import { type ObservableObject } from '@legendapp/state';
import { type UseBaseQueryResult } from '@tanstack/react-query';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';

// export interface UiType {
// 	questionId: string;
// 	question: QuestionType;
// 	isDragging: boolean;
// 	scrollToQuestion: string;
// 	scroll: boolean;
// }

type QQ = UseBaseQueryResult<LoteriaCardsDataType, unknown>;
interface State {
	// id: string;
	cards: ObservableObject<LoteriaCardsDataType>;
	props$: ObservableObject<Omit<QQ, 'data'>>;
	refForm: React.MutableRefObject<HTMLDivElement | null>;
	// ui: ObservableObject<UiType>;
	// setQuestionUi: (id: string) => void;
	// setQuestionUiAfterDelete: () => void;
}

export const LoteriaContex = createContext<State | null>(null);
