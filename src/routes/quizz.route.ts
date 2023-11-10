import { env } from '@/env.mjs';
import * as schema from '@/models/quizzes';
import {
	CreateQuizSchema,
	DeleteQuestionSchema,
	GetQuizSchema,
	UpdateQuizSchema,
} from '@/schema/quiz';
import { publicProcedure, router } from '@/trpc/server/trpc';
import { TRPCError } from '@trpc/server';
import Database from 'better-sqlite3';
import { and, asc, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { customAlphabet, urlAlphabet } from 'nanoid';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi({ apiKey: env.UPLOADTHING_SECRET });

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite, { schema });

export const quizRouter = router({
	createQuizz: publicProcedure
		.input(CreateQuizSchema)
		.mutation(async (opts) => {
			const values = opts.input;
			const { img, ...props } = values;
			const nanoid = customAlphabet(urlAlphabet, 15);
			const idQuiz = nanoid();
			const idQuestion = nanoid();

			const quiz = await db
				.insert(schema.quizzes)
				.values({
					...props,
					id: idQuiz,
					state: 'draft',
					img: img?.url,
					imgKey: img?.key,
				})
				.returning();

			await db
				.insert(schema.questions)
				.values({
					id: idQuestion,
					questionType: 'Multiple',
					quizId: idQuiz,
					question: '',
					answers: ['', '', '', ''],
					correctAnswers: [false, false, false, false],
					indexQuestion: 0,
				})
				.run();
			if (img) {
				await utapi.renameFile({
					fileKey: img.key,
					newName: `QuizPortada-${props.title}-${idQuiz}`,
				});
			}

			return {
				quiz: quiz[0],
			};
		}),
	getListQuizzes: publicProcedure.query(async () => {
		return await db.query.quizzes.findMany({
			with: {
				questions: {
					columns: {
						quizId: false,
					},
				},
			},
		});
	}),
	getQuizz: publicProcedure.input(GetQuizSchema).query(async (opts) => {
		const { input } = opts;
		const quiz = await db.query.quizzes.findMany({
			with: {
				questions: {
					columns: {
						quizId: false,
					},
					orderBy: [asc(schema.questions.indexQuestion)],
				},
			},
			where: eq(schema.quizzes.id, input.id),
		});
		if (quiz.length === 0) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'No existe el quiz',
			});
		}

		return quiz[0];
	}),
	deleteQuizz: publicProcedure.input(GetQuizSchema).mutation(async (opts) => {
		const { input } = opts;

		await db
			.delete(schema.questions)
			.where(eq(schema.questions.quizId, input.id));
		const quizzes = await db
			.delete(schema.quizzes)
			.where(eq(schema.quizzes.id, input.id))
			.returning();
		const quiz = quizzes[0];
		if (quiz && quiz.imgKey) {
			await utapi.deleteFiles(quiz.imgKey);
		}
	}),
	addQuestion: publicProcedure.input(GetQuizSchema).mutation(async (opts) => {
		const {
			input: { id: idQuiz },
		} = opts;
		const quiz = await db.query.quizzes.findFirst({
			with: {
				questions: {
					columns: {
						quizId: false,
					},
				},
			},
			where: eq(schema.quizzes.id, idQuiz),
		});
		if (!quiz) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'No existe el quiz',
			});
		}
		const nanoid = customAlphabet(urlAlphabet, 15);
		const idQuestion = nanoid();
		await db.insert(schema.questions).values({
			id: idQuestion,
			questionType: 'Multiple',
			quizId: idQuiz,
			question: '',
			answers: ['', '', '', ''],
			correctAnswers: [false, false, false],
			indexQuestion: quiz.questions.length,
		});

		return await db.query.quizzes.findFirst({
			with: {
				questions: {
					columns: {
						quizId: false,
					},
				},
			},
			where: eq(schema.quizzes.id, idQuestion),
		})!;
	}),
	updateQuestion: publicProcedure
		.input(UpdateQuizSchema)
		.mutation(async (opts) => {
			const { input } = opts;
			const {
				quizId,
				questionId,
				answerUpdate,
				correctAnswerUpdate,
				...values
			} = input;
			let answers = undefined;
			let correctAnswers: boolean[] | undefined = undefined;
			if (answerUpdate) {
				const question = await db.query.questions.findFirst({
					where: and(
						eq(schema.questions.id, questionId),
						eq(schema.questions.quizId, quizId),
					),
				});
				if (question) {
					answers = [...question.answers];
					answers[answerUpdate.index] = answerUpdate.value;
				}
			}

			if (correctAnswerUpdate) {
				const question = await db.query.questions.findFirst({
					where: and(
						eq(schema.questions.id, questionId),
						eq(schema.questions.quizId, quizId),
					),
				});
				if (question) {
					correctAnswers = [...question.correctAnswers];
					correctAnswers[correctAnswerUpdate.index] = correctAnswerUpdate.value;
				}
			}
			await db
				.update(schema.questions)
				.set({
					...values,
					answers,
					correctAnswers,
				})
				.where(
					and(
						eq(schema.questions.id, questionId),
						eq(schema.questions.quizId, quizId),
					),
				);
		}),
	deleteQuestion: publicProcedure
		.input(DeleteQuestionSchema)
		.mutation(async (opts) => {
			const { input } = opts;
			const questions = await db.query.questions.findMany({
				where: and(eq(schema.questions.quizId, input.quizId)),
			});
			if (questions.length >= 2) {
				await db
					.delete(schema.questions)
					.where(eq(schema.questions.id, input.questionId));
			} else {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No se puede eliminar la única pregunta',
				});
			}
		}),
});
