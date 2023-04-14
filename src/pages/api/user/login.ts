import { check } from 'express-validator';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/db';
import { UserModel } from '@/db/models';
import { IUser, IUserResponseApi } from '@/interfaces/user';
import { methodMiddleware, validateMiddleware } from '@/middlewares';
import { singToken } from '@/utils/utils';

type Data =
	| {
			message: string;
	  }
	| IUserResponseApi;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { email, password } = req.body as {
		email: string;
		password: string;
	};
	await db.connect();
	const user = await UserModel.findOne({ email });
	if (!user) {
		return res
			.status(400)
			.json({ message: 'Credenciales incorrectas - EMAIL' });
	}
	if (!user.comparePasswords(password)) {
		return res
			.status(400)
			.json({ message: 'Credenciales incorrectas - PASSWORD' });
	}

	await db.disconnect();
	const userObj = user.toJSON<IUser>({ flattenMaps: false });
	const { id, role, name } = userObj;
	const token = singToken({ email, id, role });
	return res.status(200).json({ user: { role, name, email }, token });
};

export default methodMiddleware(
	validateMiddleware(
		handler,
		check('email').isEmail().toLowerCase(),
		check('password').isString().isLength({ min: 6 }),
	),
	'POST',
);
