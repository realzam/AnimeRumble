import { createContext } from 'react';
import { type ObservableObject } from '@legendapp/state';
import { type UseBaseQueryResult } from '@tanstack/react-query';
import { type DebouncedState } from 'use-debounce';

import { type QuestionType, type QuizDataType } from '@/types/quizQuery';

type QQ = UseBaseQueryResult<QuizDataType, unknown>;

export interface UiType {
	questionId: string;
	question: QuestionType;
	isDragging: boolean;
	scrollToQuestion: string;
	scroll: boolean;
}

interface State {
	id: string;
	quiz: ObservableObject<QuizDataType>;
	props$: ObservableObject<Omit<QQ, 'data'>>;
	ui: ObservableObject<UiType>;
	quizDebounced: DebouncedState<() => Promise<void>>;
	setQuestionUi: (id: string) => void;
	setQuestionUiAfterDelete: () => void;
}

export const QuizContex = createContext<State | null>(null);
