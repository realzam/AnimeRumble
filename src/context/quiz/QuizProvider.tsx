import { useReducer } from 'react';

import { QuizContext, quizReducer } from '.';

import { IQuiz, IQuizQuestion } from '@/interfaces';

export interface QuizState {
	quiz: IQuiz;
	index: number;
	showDialogDelete: boolean;
	isDragging: boolean;
}

interface InitialState {
	quiz: IQuiz;
	index: number;
}

interface Props {
	children: JSX.Element | JSX.Element[];
	initialState: InitialState;
}
export const QuizProvider = ({ children, initialState }: Props) => {
	const [state, dispatch] = useReducer(quizReducer, {
		...initialState,
		showDialogDelete: false,
		isDragging: false,
	});

	const setShowDialogDelete = (value: boolean) => {
		dispatch({ type: 'Quiz.SetShowDialogDelete', payload: value });
	};

	const setIsDragging = (value: boolean) => {
		dispatch({ type: 'Quiz.SetIsDragging', payload: value });
	};

	const setIndex = (index: number) => {
		dispatch({ type: 'Quiz.SetIndex', payload: index });
	};

	const addQuestion = (quiz: IQuizQuestion) => {
		dispatch({ type: 'Quiz.AddQuestion', payload: quiz });
	};

	const updateQuestions = (questions: IQuizQuestion[]) => {
		dispatch({ type: 'Quiz.UpdateQuestions', payload: questions });
	};

	const updateQuestion = (question: IQuizQuestion) => {
		dispatch({ type: 'Quiz.UpdateQuestion', payload: question });
	};

	const getQuestion = () => state.quiz.questions[state.index];

	//setQuestionByIndex
	return (
		<QuizContext.Provider
			value={{
				...state,
				addQuestion,
				updateQuestion,
				updateQuestions,
				setIndex,
				setIsDragging,
				setShowDialogDelete,
				question: getQuestion(),
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};
