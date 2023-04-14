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
	const quiz = await QuizModel.findByIdAndDelete(quizID);
	if (!quiz) {
		return res
			.status(400)
			.json({ message: 'No existe el quiz con el ID:' + quizID });
	}
	await db.disconnect();
	return res.status(200).json(quiz.toJSON({ flattenMaps: false }));
};

export default methodMiddleware(
	validateMiddleware(handler, check('quizID').isMongoId()),
	'PUT',
);
