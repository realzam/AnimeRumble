import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const quizzes = sqliteTable('quizzes', {
	id: text('id').primaryKey().notNull(),
	title: text('title').notNull(),
	description: text('description').default('').notNull(),
	state: text('state', { enum: ['active', 'finished', 'draft'] }).notNull(),
});

export const questions = sqliteTable('questions', {
	id: text('id').primaryKey().notNull(),
	quizId: text('quizId')
		.references(() => quizzes.id)
		.notNull(),
	question: text('question').default('').notNull(),
	questionType: text('questionType', { enum: ['Multiple', 'TF'] })
		.default('Multiple')
		.notNull(),
	time: text('time', {
		enum: ['5', '10', '15', '20', '30', '45', '60', '90'],
	})
		.default('20')
		.notNull(),
	points: text('points', {
		enum: ['standar', 'none', 'double'],
	})
		.default('standar')
		.notNull(),
	answers: text('answers', { mode: 'json' }).$type<string[]>().notNull(),
	correctAnswer: text('correctAnswer', { mode: 'json' })
		.$type<boolean[]>()
		.notNull(),
	correctAnswerTF: integer('correctAnswerTF', { mode: 'boolean' }),
});

export const quizzesRelations = relations(quizzes, ({ many }) => ({
	questions: many(questions),
}));

export const questionsRelations = relations(questions, ({ one }) => ({
	quiz: one(quizzes, {
		fields: [questions.quizId],
		references: [quizzes.id],
	}),
}));
