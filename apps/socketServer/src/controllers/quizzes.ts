import { db, quizzes } from 'anime-db';
import { eq } from 'drizzle-orm';

export const getQuizzes = async () => {
	const res = await db.query.quizzes.findMany({
		where: eq(quizzes.state, 'active'),
	});
	return res;
};

export const setFinishQuiz = async (id: string) => {
	await db
		.update(quizzes)
		.set({
			state: 'finished',
		})
		.where(eq(quizzes.id, id));
};
