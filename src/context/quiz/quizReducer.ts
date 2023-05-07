import { QuizState } from '.';

type QuizActionType =
	| { type: 'Quiz.SetIndex'; payload: number }
	| { type: 'Quiz.SetShowDialogDelete'; payload: boolean }
	| { type: 'Quiz.SetIsDragging'; payload: boolean }
	| { type: 'Quiz.SetQuizID'; payload: string };

export const quizReducer = (
	state: QuizState,
	action: QuizActionType,
): QuizState => {
	switch (action.type) {
		case 'Quiz.SetQuizID':
			return { ...state, quizID: action.payload };
		case 'Quiz.SetIndex':
			return { ...state, index: action.payload };
		case 'Quiz.SetShowDialogDelete':
			return { ...state, showDialogDelete: action.payload };
		case 'Quiz.SetIsDragging':
			return { ...state, isDragging: action.payload };
		default:
			return state;
	}
};
