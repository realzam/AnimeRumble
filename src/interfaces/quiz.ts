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

interface IQuizCore {
	id: string;
	title: string;
	description: string;
	createdAt: number;
	img: string;
	status: QuizStatus;
}

export interface IQuizBasic extends IQuizCore {
	questionsNumber: number;
}

export interface IQuiz extends IQuizCore {
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
