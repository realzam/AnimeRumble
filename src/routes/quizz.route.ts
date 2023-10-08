import * as schema from '@/db/models/quizzes';
import { CreateQuizSchema, GetQuizSchema } from '@/schema/quiz';
import { publicProcedure, router } from '@/trpc/server/trpc';
import { TRPCError } from '@trpc/server';
import Database from 'better-sqlite3';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { customAlphabet, urlAlphabet } from 'nanoid';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite, { schema });

export const quizRouter = router({
	createQuizz: publicProcedure
		.input(CreateQuizSchema)
		.mutation(async (opts) => {
			const values = opts.input;
			const nanoid = customAlphabet(urlAlphabet, 15);
			const idQuiz = nanoid();
			const idQuestion = nanoid();

			const quiz = await db
				.insert(schema.quizzes)
				.values({
					id: idQuiz,
					title: values.title,
					state: 'draft',
				})
				.returning();

			await db
				.insert(schema.questions)
				.values({
					id: idQuestion,
					questionType: 'Multiple',
					quizId: idQuiz,
					question: '¿Que día es hoy?',
				})
				.run();

			return {
				quiz: quiz[0],
			};
		}),
	quizz: publicProcedure.input(GetQuizSchema).query(async (opts) => {
		const { input } = opts;
		const quiz = await db.query.quizzes.findMany({
			with: {
				questions: {
					columns: {
						quizId: false,
					},
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
});
