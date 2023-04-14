import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/db';
import { QuizModel } from '@/db/models';
import { IQuiz } from '@/interfaces';

type Data =
	| {
			message: string;
	  }
	| IQuiz[];

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	switch (req.method) {
		case 'GET':
			getQuizzes(req, res);
			break;

		default:
			return res.status(404).json({ message: 'API no existe' });
	}
}

async function getQuizzes(req: NextApiRequest, res: NextApiResponse<Data>) {
	await db.connect();
	const quizzes = await QuizModel.find();
	await db.disconnect();
	return res.status(200).json(quizzes);
}
