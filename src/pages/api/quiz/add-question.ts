import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/db';
import { QuestionDB, QuizModel } from '@/db/models';
import { IQuizQuestion } from '@/interfaces';

type Data =
	| {
			message: string;
	  }
	| IQuizQuestion;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	switch (req.method) {
		case 'POST':
			addQuestion(req, res);
			break;

		default:
			return res.status(404).json({ message: 'API no existe' });
	}
}

async function addQuestion(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { quizID } = req.body as { quizID?: string };
	if (!quizID) {
		return res
			.status(400)
			.json({ message: 'El parametro quizID es requerido' });
	}
	if (!mongoose.isValidObjectId(quizID)) {
		return res
			.status(400)
			.json({ message: 'El parametro quizID no es valido' });
	}
	await db.connect();
	const quiz = await QuizModel.findById(quizID);
	if (!quiz) {
		return res
			.status(400)
			.json({ message: 'El parametro quizID no es valido' });
	}
	quiz.questions.push({
		question: '',
	} as QuestionDB);
	await quiz.save();
	const newQuestion = quiz.questions[quiz.questions.length - 1];
	await db.disconnect();

	res.status(200).json(newQuestion);
}
