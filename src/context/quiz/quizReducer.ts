import { QuizState } from '.';

import { IQuizQuestion } from '@/interfaces';

type QuizActionType =
	| { type: 'Quiz.AddQuestion'; payload: IQuizQuestion }
	| { type: 'Quiz.UpdateQuestion'; payload: IQuizQuestion }
	| { type: 'Quiz.UpdateQuestions'; payload: IQuizQuestion[] }
	| { type: 'Quiz.SetIndex'; payload: number };
export const quizReducer = (
	state: QuizState,
	action: QuizActionType,
): QuizState => {
	const { questions } = state.quiz;
	switch (action.type) {
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
			console.log('Quiz.UpdateQuestions', action.payload.length, index);

			return {
				...state,
				quiz: { ...state.quiz, questions: [...action.payload] },
				index,
			};

		case 'Quiz.AddQuestion':
			questions.push(action.payload);
			return { ...state, index: state.quiz.questions.length - 1 };

		case 'Quiz.SetIndex':
			if (
				action.payload >= 0 &&
				action.payload <= state.quiz.questions.length - 1
			) {
				return { ...state, index: action.payload };
			}
			return state;
		default:
			return state;
	}
};
