import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

import { QuestionDB } from './Question';

import type { QuizQuestionQuery, QuizStatus } from '@/interfaces';
@modelOptions({
	schemaOptions: {
		collection: 'quizzes',
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
		enum: ['draf', 'in-progress', 'finished'],
		default: 'draf',
		required: true,
	})
	status: QuizStatus;

	@prop({ type: () => [QuestionDB] })
	questions: QuestionDB[];

	@prop({ type: String, trim: true, default: '/placeholders/quiz_overlay.jpg' })
	img: string;

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
		if (this.questions.length > 1 && index !== -1) {
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

	clone() {
		const clone = new QuizDB();
		clone.title = this.title + ' - copia';
		clone.description = this.description;
		clone.createdAt = this.createdAt;
		clone.status = this.status;
		clone.questions = this.questions.map(q => q.clone());
		clone.img = this.img;
		return clone;
	}

	objectBasic() {
		return {
			id: this.id,
			title: this.title,
			description: this.description,
			createdAt: this.createdAt,
			img: this.img,
			status: this.status,
			questionsNumber: this.questions.length,
		};
	}
}

const QuizModel = getModelForClass(QuizDB);
export default QuizModel;
