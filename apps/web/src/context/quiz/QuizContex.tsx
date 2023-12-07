'use client';

import { createContext } from 'react';
import { type ObservableObject } from '@legendapp/state';

import {
	type QuestionType,
	type QuizDataType,
	type TypeQuizQueryProps,
} from '@/types/quizQuery';

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
	props: ObservableObject<TypeQuizQueryProps>;
	ui: ObservableObject<UiType>;
	setQuestionUi: (id: string) => void;
}

export const QuizContex = createContext<State | null>(null);
