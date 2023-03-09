export type QuizStatus = 'draf' | 'created' | 'in-progress' | 'finished';

export type QuizQuestionType = 'Quiz' | 'TrueFalse';
export type QuizQuestionTimeLimit =
	| '5'
	| '10'
	| '20'
	| '30'
	| '60'
	| '90'
	| '120';
export type QuizQuestionPoints = 'Standar' | 'Double' | 'None';

export interface IQuiz {
	id: string;
	title: string;
	description: string;
	createdAt: number;
	status: QuizStatus;
	questions: IQuizQuestion[];
}

export interface IQuizQuestion {
	id: string;
	type: QuizQuestionType;
	time: QuizQuestionTimeLimit;
	points: QuizQuestionPoints;
	question: string;
	correctAnswersQuiz: boolean[];
	correctAnswerTrueFalse?: boolean;
	answers: string[];
	img?: string;
}

export interface QuizQuestionQuery {
	type?: QuizQuestionType;
	time?: QuizQuestionTimeLimit;
	points?: QuizQuestionPoints;
	question?: string;
	correctAnswerQuiz: [number, boolean];
	correctAnswerTrueFalse?: boolean;
	answer?: [number, string];
	img?: string;
}
