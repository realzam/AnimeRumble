import { check } from 'express-validator';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/db';
import { QuestionDB, QuizModel } from '@/db/models';
import { IQuizQuestion } from '@/interfaces';
import { methodMiddleware, validateMiddleware } from '@/middlewares';
type Data =
	| {
			message: string;
	  }
	| IQuizQuestion;

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
	quiz.questions.push({
		question: '',
	} as QuestionDB);
	await quiz.save();
	const newQuestion = quiz.questions[quiz.questions.length - 1];
	await db.disconnect();
	return res.status(200).json(newQuestion);
};

export default methodMiddleware(
	validateMiddleware(handler, check('quizID').isMongoId()),
	'POST',
);
