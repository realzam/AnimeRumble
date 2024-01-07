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
	showDeleteQuestionAlert: boolean;
	targetDeleteQuestion: string;
}

interface State {
	id: string;
	quiz: ObservableObject<QuizDataType>;
	props: ObservableObject<TypeQuizQueryProps>;
	ui: ObservableObject<UiType>;
	setQuestionUi: (id: string) => void;
	setQuestionUiAfterDelete: () => void;
	openDeleteQuestion: (id: string) => void;
	closeDeleteQuestion: () => void;
	clearScroll: () => void;
}

export const QuizContex = createContext<State | null>(null);
