import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

import { QuestionDB } from './Question';

import type { QuizQuestionQuery, QuizStatus } from '@/interfaces';
@modelOptions({
	schemaOptions: {
		toJSON: {
			flattenMaps: false,
			virtuals: true,
			versionKey: false,
			transform: function (doc, ret) {
				delete ret._id;
			},
		},
	},
})
export class QuizDB {
	id: string;

	@prop({ type: String, default: 'Anime Quiz', required: true, trim: true })
	title: string;

	@prop({ type: String, default: '', trim: true })
	description: string;

	@prop({ type: Number, required: true })
	createdAt: number;

	@prop({
		type: String,
		enum: ['draf', 'created', 'in-progress', 'finished'],
		default: 'draf',
		required: true,
	})
	status: QuizStatus;

	@prop({ type: () => [QuestionDB] })
	questions: QuestionDB[];

	moveQuestion(from: number, to: number) {
		this.questions.splice(
			to < 0 ? this.questions.length + to : to,
			0,
			this.questions.splice(from, 1)[0],
		);
		return this.questions;
	}

	deleteQuestion(questionID: string) {
		const index = this.questions.findIndex(q => q.id === questionID);
		if (index !== -1) {
			this.questions.splice(index, 1);
		}
		return this.questions;
	}

	copyQuestion(questionID: string) {
		const index = this.questions.findIndex(q => q.id === questionID);
		if (index !== -1) {
			const question = this.questions[index].clone();
			question.question = question.question + ' - copy';
			this.questions.splice(index + 1, 0, question);
		}
		return this.questions;
	}

	updateQuestion(questionID: string, question: QuizQuestionQuery) {
		const index = this.questions.findIndex(q => q.id === questionID);
		if (index === -1) {
			return false;
		}
		this.questions[index].setProps(question);
		return true;
	}
}

const QuizModel = getModelForClass(QuizDB);
export default QuizModel;
