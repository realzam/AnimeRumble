import {
	check,
	Result,
	ValidationError,
	validationResult,
} from 'express-validator';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/db';
import { QuizModel } from '@/db/models';
import { IQuizQuestion } from '@/interfaces';

type Data =
	| {
			message: string;
	  }
	| IQuizQuestion[]
	| Result<ValidationError>;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	switch (req.method) {
		case 'PUT':
			const vali = [
				check('quizID').isMongoId(),
				check('questionID').isMongoId(),
			];
			await Promise.all(vali.map(validation => validation.run(req)));
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json(errors);
			}
			deleteQuestion(req, res);
			break;

		default:
			return res.status(404).json({ message: 'API no existe' });
	}
}

async function deleteQuestion(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { quizID, questionID } = req.body as {
		quizID: string;
		questionID: string;
	};
	await db.connect();
	const quiz = await QuizModel.findById(quizID);
	if (!quiz) {
		return res
			.status(400)
			.json({ message: 'El parametro quizID no es valido' });
	}
	if (quiz.questions.length === 1) {
		return res
			.status(400)
			.json({ message: 'No es posible eliminar la unica pregunta de un quiz' });
	}
	quiz.deleteQuestion(questionID);
	await quiz.save();
	await db.disconnect();

	res.status(200).json(quiz.questions);
}
