import { ValidationError, body, validationResult } from 'express-validator';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import { db } from '@/db';
import { QuizModel, UserDB, UserModel } from '@/db/models';
import { IQuizBasic } from '@/interfaces';
import { sendMail } from '@/utils/mail';

type Data =
	| {
			message: string;
	  }
	| IQuizBasic[]
	| IQuizBasic
	| { errors: ValidationError[] };
const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	// await db.connect();
	// const quiz = UserModel.findOne({})
	// await db.disconnect();
	try {
		await sendMail();
		return res.status(200).json({ message: 'ok' });
	} catch (error) {
		return res.status(200).json({ message: 'error' });
	}
});

export default router.handler({
	onError: (err, req, res) => {
		const e = err as Error;
		console.error(e.stack);
		res.status(501).json({ error: `Sorry something Happened! ${e.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});
