import { createContext } from 'react';
interface ContextProps {
	quizID: string;
	index: number;
	showDialogDelete: boolean;
	isDragging: boolean;
	setIsDragging: (value: boolean) => void;
	setShowDialogDelete: (value: boolean) => void;
	setIndex: (index: number) => void;
	setQuizID: (id: string) => void;
}

export const QuizContext = createContext({} as ContextProps);
