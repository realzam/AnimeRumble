import { type QuizState } from './QuizProvider';

type QuizActionType =
	| { type: 'Quiz.SetIndexQuestionUI'; payload: string }
	| { type: 'Quiz.SetShowDialogDelete'; payload: boolean }
	| { type: 'Quiz.SetIsDragging'; payload: boolean }
	| { type: 'Quiz.SetQuizID'; payload: string };

export const quizReducer = (
	state: QuizState,
	action: QuizActionType,
): QuizState => {
	switch (action.type) {
		case 'Quiz.SetIndexQuestionUI':
			return state;
		default:
			return state;
	}
};
