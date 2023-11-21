'use client';

import { createContext } from 'react';
import {
	type ObservableObject,
	type ObservablePrimitive,
} from '@legendapp/state';

import { type QuizDataType } from '@/types/quizQuery';

export type StatesPlayQuiz =
	| 'showStart'
	| 'showQuestion'
	| 'showFullUI'
	| 'showPrelude'
	| 'showEnd';

interface State {
	index: ObservablePrimitive<number>;
	showCorrectAnswer: ObservablePrimitive<boolean>;
	isCorrectAnswer: ObservablePrimitive<boolean>;
	stateQuiz: ObservablePrimitive<StatesPlayQuiz>;
	questions: ObservableObject<QuizDataType['questions']>;
	question: QuizDataType['questions'][0];
	nextQuestion: () => void;
	startQuiz: () => void;
	answer: (index: number) => Promise<void>;
}

export const PlayQuizContext = createContext<State | null>(null);
