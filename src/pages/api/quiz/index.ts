import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/db';
import { QuizModel } from '@/db/models';
import { IQuiz } from '@/interfaces';
import { methodMiddleware } from '@/middlewares';

type Data =
	| {
			message: string;
	  }
	| IQuiz[];

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		await db.connect();
		const quizzes = await QuizModel.find();
		await db.disconnect();
		return res.status(200).json(quizzes);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'SERVER ERROR :(' });
	}
};

export default methodMiddleware(handler, 'GET');
