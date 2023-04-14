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
	const { quizID } = req.body as {
		quizID: string;
	};
	await db.connect();
	const quiz = await QuizModel.findById(quizID);
	if (!quiz) {
		return res
			.status(400)
			.json({ message: 'No existe quiz con el ID:' + quizID });
	}
	const clone = quiz.clone();
	const newQuiz = new QuizModel(clone);
	await newQuiz.save();
	await db.disconnect();

	return res.status(200).json(clone);
};

export default methodMiddleware(
	validateMiddleware(handler, check('quizID').isMongoId()),
	'PUT',
);
