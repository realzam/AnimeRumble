import { ValidationError, body, validationResult } from 'express-validator';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import { db } from '@/db';
import { UserModel } from '@/db/models';
import { IQuizBasic } from '@/interfaces';
import { sendVerifyEmail } from '@/utils/mail';
import { encodeBase64, singToken } from '@/utils/utils';

type Data =
	| {
			message: string;
	  }
	| IQuizBasic[]
	| IQuizBasic
	| { errors: ValidationError[] };
const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(
	body('email').isEmail().withMessage('El email es requerido'),
	async (req: NextApiRequest, res: NextApiResponse<Data>) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		try {
			const { email } = req.body as { email: string };
			await db.connect();
			const user = await UserModel.findOne({ email });
			await db.disconnect();
			if (!user) {
				return res
					.status(404)
					.json({ message: 'El correo electrónico no está registrado.' });
			}
			const token = await singToken({ userId: user.id }, '30m');
			const url = `https://anime.real-apps.site/reset-password?token=${encodeBase64(
				token,
			)}`;
			await sendVerifyEmail('sza0210escom@gmail.com', url);
			return res.status(200).json({ message: 'ok' });
		} catch (error) {
			return res.status(200).json({ message: 'error' });
		}
	},
);

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
