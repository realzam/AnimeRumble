import { useReducer } from 'react';

import { QuizContext, quizReducer } from '.';

export interface QuizState {
	quizID: string;
	index: number;
	showDialogDelete: boolean;
	isDragging: boolean;
}

interface Props {
	children: JSX.Element | JSX.Element[];
}
export const QuizProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(quizReducer, {
		quizID: '',
		index: 0,
		showDialogDelete: false,
		isDragging: false,
	});

	const setQuizID = (id: string) => {
		dispatch({ type: 'Quiz.SetQuizID', payload: id });
	};

	const setShowDialogDelete = (value: boolean) => {
		dispatch({ type: 'Quiz.SetShowDialogDelete', payload: value });
	};

	const setIsDragging = (value: boolean) => {
		dispatch({ type: 'Quiz.SetIsDragging', payload: value });
	};

	const setIndex = (index: number) => {
		dispatch({ type: 'Quiz.SetIndex', payload: index });
	};

	return (
		<QuizContext.Provider
			value={{
				...state,
				setIndex,
				setQuizID,
				setIsDragging,
				setShowDialogDelete,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};
