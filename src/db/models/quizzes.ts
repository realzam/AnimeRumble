import { relations } from 'drizzle-orm';
import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

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
	questionType: text('questionType', { enum: ['Multiple', 'TF'] }).notNull(),
	answers: blob('answers', { mode: 'json' }).$type<string[]>(),
	correctAnswer: blob('correctAnswer', { mode: 'json' }).$type<string[]>(),
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