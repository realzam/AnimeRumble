import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import isEmail from 'validator/lib/isEmail';

import { db } from '@/db';
import { UserModel } from '@/db/models';
import { sendRecoveryEmail } from '@/utils/mail';
import { singToken } from '@/utils/utils';

interface Data {
	message: string;
}
const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { email } = req.body as {
		email: string | undefined;
		destination: string | undefined;
	};
	if (!email) {
		return res
			.status(400)
			.json({ message: 'El correo electrónico es obligatorio' });
	}
	if (!isEmail(email)) {
		return res
			.status(400)
			.json({ message: 'El correo electrónico no es valido' });
	}
	try {
		await db.connect();
		const user = await UserModel.findOne({ email });
		await db.disconnect();
		if (!user) {
			return res
				.status(400)
				.json({ message: 'El correo electrónico no está registrado.' });
		}
		const token = await singToken({ userId: user.id }, '30m');
		const url = `https://anime.real-apps.site/auth/reset-password?token=${token}`;
		await sendRecoveryEmail(user.name, email, url);
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
