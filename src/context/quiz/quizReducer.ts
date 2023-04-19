import { QuizState } from '.';

import { IQuiz, IQuizQuestion } from '@/interfaces';

type QuizActionType =
	| { type: 'Quiz.UpdateQuiz'; payload: IQuiz }
	| { type: 'Quiz.AddQuestion'; payload: IQuizQuestion }
	| { type: 'Quiz.UpdateQuestion'; payload: IQuizQuestion }
	| { type: 'Quiz.UpdateQuestions'; payload: IQuizQuestion[] }
	| { type: 'Quiz.SetIndex'; payload: number }
	| { type: 'Quiz.SetShowDialogDelete'; payload: boolean }
	| { type: 'Quiz.SetIsDragging'; payload: boolean };

export const quizReducer = (
	state: QuizState,
	action: QuizActionType,
): QuizState => {
	const { questions } = state.quiz;
	switch (action.type) {
		case 'Quiz.UpdateQuiz':
			if (action.payload.questions.length - 1 < state.index) {
				return {
					...state,
					quiz: { ...action.payload },
					index: action.payload.questions.length - 1,
				};
			}
			return { ...state, quiz: { ...action.payload } };
		case 'Quiz.UpdateQuestion':
			questions[state.index] = action.payload;
			return { ...state };

		case 'Quiz.UpdateQuestions':
			const { id } = state.quiz.questions[state.index];
			let index = action.payload.findIndex(q => q.id === id);
			if (index === -1) {
				index = state.index;
			}
			index = Math.min(action.payload.length - 1, Math.max(0, index));
			return {
				...state,
				quiz: { ...state.quiz, questions: [...action.payload] },
				index,
			};

		case 'Quiz.AddQuestion':
			return {
				...state,
				quiz: { ...state.quiz, questions: [...questions, action.payload] },
				index: questions.length,
			};

		case 'Quiz.SetIndex':
			if (
				action.payload >= 0 &&
				action.payload <= state.quiz.questions.length - 1
			) {
				return { ...state, index: action.payload };
			}
			return state;
		case 'Quiz.SetShowDialogDelete':
			return { ...state, showDialogDelete: action.payload };
		case 'Quiz.SetIsDragging':
			return { ...state, isDragging: action.payload };
		default:
			return state;
	}
};
