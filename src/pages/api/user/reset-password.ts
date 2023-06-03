import bcrypt from 'bcryptjs';
import { body } from 'express-validator';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/db';
import { UserModel } from '@/db/models';
import { IJWTUserRecoveryPassword, IQuiz } from '@/interfaces';
import { methodMiddleware, validateMiddleware } from '@/middlewares';
import { isValidTokenJose } from '@/utils/edge';
type Data =
	| {
			message: string;
	  }
	| IQuiz;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { token, password, cpassword } = req.body as {
		token: string;
		password: string;
		cpassword: string;
	};
	const { valid, token: tokenObj } =
		await isValidTokenJose<IJWTUserRecoveryPassword>(token);
	if (!valid) {
		return res.status(400).json({ message: 'Token no valido' });
	}
	if (password !== cpassword) {
		return res.status(400).json({ message: 'Las contraseñas no son igulaes' });
	}
	await db.connect();
	const user = await UserModel.findByIdAndUpdate(tokenObj.userId, {
		$set: { password: bcrypt.hashSync(password) },
	});
	await db.disconnect();
	if (!user) {
		return res.status(400).json({ message: 'No existe el usuario' });
	}

	return res.status(200).json({ message: 'ok' });
};

export default methodMiddleware(
	validateMiddleware(
		handler,
		body('token')
			.notEmpty()
			.isString()
			.withMessage('Es necesario enviarl el token'),
		body('password')
			.notEmpty()
			.isString()
			.isLength({ min: 6 })
			.withMessage('Es necesario enviarl el password'),
		body('cpassword')
			.notEmpty()
			.isString()
			.isLength({ min: 6 })
			.withMessage('Es necesario enviarl el cpassword'),
	),
	'POST',
);
