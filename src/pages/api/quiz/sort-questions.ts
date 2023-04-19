import { check } from 'express-validator';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/db';
import { QuizModel } from '@/db/models';
import { IQuiz } from '@/interfaces';
import { methodMiddleware, validateMiddleware } from '@/middlewares';
type Data =
	| {
			message: string;
	  }
	| IQuiz;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { quizID, from, to } = req.body as {
		quizID: string;
		from: number;
		to: number;
	};

	await db.connect();
	const quiz = await QuizModel.findById(quizID);
	if (!quiz) {
		return res
			.status(400)
			.json({ message: 'El parametro quizID no es valido' });
	}
	quiz.moveQuestion(from, to);
	await quiz.save();
	await db.disconnect();
	return res.status(200).json(quiz);
};

export default methodMiddleware(
	validateMiddleware(
		handler,
		check('quizID').isMongoId(),
		check('from').isInt(),
		check('to').isInt(),
	),
	'PUT',
);