import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/db';
import { QuizModel } from '@/db/models';
import { IQuiz } from '@/interfaces';
import { methodMiddleware } from '@/middlewares';

type Data =
	| {
			message: string;
	  }
	| IQuiz;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		const delay = 2000;
		await new Promise(r => setTimeout(r, delay));
		const { id } = req.query;

		if (!mongoose.isValidObjectId(id)) {
			return res.status(400).json({ message: 'El ID no es valido' });
		}
		await db.connect();
		const quiz = await QuizModel.findById(id);
		await db.disconnect();
		if (!quiz) {
			return res
				.status(400)
				.json({ message: 'No existe Quiz con el ID:' + id });
		}
		return res.status(200).json(quiz);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'SERVER ERROR :(' });
	}
};

export default methodMiddleware(handler, 'GET');
