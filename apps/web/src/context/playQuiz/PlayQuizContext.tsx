'use client';

import { createContext } from 'react';
import {
	type ObservableArray,
	type ObservableObject,
	// type ObservableObject,
	type ObservablePrimitive,
} from '@legendapp/state';

import {
	type TypeGetQuestionUser,
	type TypeGetQuizPlay,
	type TypeGetSimpleSumaryUser,
} from '@/types/quizQuery';

// import { type UseBaseQueryResult } from '@tanstack/react-query';

// import { type AnserUserDataType, type QuizDataType } from '@/types/quizQuery';

export type StatesPlayQuiz =
	| 'showStart'
	| 'showQuestion'
	| 'showFullUI'
	| 'showLoading'
	| 'showEnd';

interface State {
	stateQuiz: ObservablePrimitive<StatesPlayQuiz>;
	quiz: TypeGetQuizPlay;
	questionUser: ObservableObject<TypeGetQuestionUser>;
	time: ObservablePrimitive<number>;
	showCorrectAnswer: ObservablePrimitive<boolean>;
	isCorrectAnswer: ObservablePrimitive<boolean>;
	cancelTimer: ObservablePrimitive<boolean>;
	points: ObservablePrimitive<number>;
	finishTime: ObservablePrimitive<number>;
	correctAns: ObservableArray<number[]>;
	isLoadingAnswer: ObservablePrimitive<boolean>;
	simpleSumary: ObservableObject<TypeGetSimpleSumaryUser>;
	joinToQuiz: () => void;
	answer: (index: number) => Promise<void>;
}

export const PlayQuizContext = createContext<State | null>(null);
