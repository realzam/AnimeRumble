import { questions, quizzes } from '@/db/models/quizzes';
import { CreteQuizSchema } from '@/schema/quiz';
import { publicProcedure, router } from '@/trpc/server/trpc';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { customAlphabet, urlAlphabet } from 'nanoid';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

export const quizRouter = router({
	createQuizz: publicProcedure.input(CreteQuizSchema).mutation(async (opts) => {
		const values = opts.input;
		const nanoid = customAlphabet(urlAlphabet, 15);
		const idQuiz = nanoid();
		const idQuestion = nanoid();

		const quiz = await db
			.insert(quizzes)
			.values({
				id: idQuiz,
				title: values.title,
				state: 'draft',
			})
			.returning();

		await db
			.insert(questions)
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
});
