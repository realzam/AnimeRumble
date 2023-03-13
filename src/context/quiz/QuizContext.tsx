import { createContext } from 'react';

import { IQuiz, IQuizQuestion } from '@/interfaces';

interface ContextProps {
	question: IQuizQuestion;
	quiz: IQuiz;
	index: number;
	showDialogDelete: boolean;
	isDragging: boolean;
	setIsDragging: (value: boolean) => void;
	setShowDialogDelete: (value: boolean) => void;
	setIndex: (index: number) => void;
	addQuestion: (question: IQuizQuestion) => void;
	updateQuestion: (question: IQuizQuestion) => void;
	updateQuestions: (questions: IQuizQuestion[]) => void;
}

export const QuizContext = createContext({} as ContextProps);
