import { modelOptions, prop } from '@typegoose/typegoose';

import type {
	QuizQuestionPoints,
	QuizQuestionQuery,
	QuizQuestionTimeLimit,
	QuizQuestionType,
} from '@/interfaces';

@modelOptions({
	schemaOptions: {
		autoCreate: false,
		toJSON: {
			virtuals: true,
			versionKey: false,
			transform: function (doc, ret) {
				delete ret._id;
			},
		},
	},
})
export class QuestionDB {
	id: string;

	@prop({ type: String, enum: ['Quiz', 'TrueFalse'], default: 'Quiz' })
	type: QuizQuestionType;

	@prop({
		type: String,
		enum: ['5', '10', '20', '30', '60', '90', '120'],
		default: '20',
	})
	time: QuizQuestionTimeLimit;

	@prop({
		type: String,
		enum: ['Standar', 'Double', 'None'],
		default: 'Standar',
	})
	points: QuizQuestionPoints;

	@prop({ type: String, default: '', trim: true })
	question: string;

	@prop({ type: () => [Boolean], default: [false, false, false, false] })
	correctAnswersQuiz: boolean[];

	@prop({ type: Boolean })
	correctAnswerTrueFalse?: boolean;

	@prop({ type: () => [String], default: ['', '', '', ''] })
	answers: string[];

	@prop({ type: String, trim: true })
	img?: string;

	setProps(props: QuizQuestionQuery) {
		this.type = props.type || this.type;
		this.time = props.time || this.time;
		this.points = props.points || this.points;
		this.question =
			props.question === undefined ? this.question : props.question;
		if (props.correctAnswerQuiz) {
			const [index, value] = props.correctAnswerQuiz;
			this.correctAnswersQuiz[index] = value;
		}
		if (props.answer) {
			const [index, value] = props.answer;
			this.answers[index] = value;
		}
		this.correctAnswerTrueFalse =
			props.correctAnswerTrueFalse === undefined
				? this.correctAnswerTrueFalse
				: props.correctAnswerTrueFalse;
		this.img = props.img || this.img;
	}
	clone() {
		const clone = new QuestionDB();
		clone.type = this.type;
		clone.time = this.time;
		clone.points = this.points;
		clone.question = this.question;
		clone.correctAnswersQuiz = this.correctAnswersQuiz;
		clone.correctAnswerTrueFalse = this.correctAnswerTrueFalse;
		clone.answers = this.answers;
		clone.img = this.img;
		return clone;
	}
}

/*
	type: QuizQuestionType;
	time: QuizQuestionTimeLimit;
	points: QuizQuestionPoints;
	question: string;
	correctAnswersQuiz: boolean[];
	correctAnswerTrueFalse?: boolean;
	answers: string[];
	img?: string;
*/
