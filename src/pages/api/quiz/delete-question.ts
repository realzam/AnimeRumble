import { check } from 'express-validator';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/db';
import { QuizModel } from '@/db/models';
import { IQuizQuestion } from '@/interfaces';
import { methodMiddleware, validateMiddleware } from '@/middlewares';
type Data =
	| {
			message: string;
	  }
	| IQuizQuestion[];

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { quizID, questionID } = req.body as {
		quizID: string;
		questionID: string;
	};
	await db.connect();
	const quiz = await QuizModel.findById(quizID);
	if (!quiz) {
		return res
			.status(400)
			.json({ message: 'No existe quiz con el ID:' + quizID });
	}
	if (quiz.questions.length === 1) {
		return res
			.status(400)
			.json({ message: 'No es posible eliminar la unica pregunta de un quiz' });
	}
	quiz.deleteQuestion(questionID);
	await quiz.save();
	await db.disconnect();

	return res.status(200).json(quiz.questions);
};

export default methodMiddleware(
	validateMiddleware(
		handler,
		check('quizID').isMongoId(),
		check('questionID').isMongoId(),
	),
	'PUT',
);
