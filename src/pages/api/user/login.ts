import {
	check,
	Result,
	ValidationError,
	validationResult,
} from 'express-validator';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/db';
import { UserModel } from '@/db/models';
import { IUser } from '@/interfaces/user';
import { singToken } from '@/utils/utils';

type Data =
	| {
			message: string;
	  }
	| Result<ValidationError>
	| {
			token: string;
			user: {
				email: string;
				role: string;
				name: string;
			};
	  };

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	switch (req.method) {
		case 'POST':
			const vali = [
				check('email').isEmail().toLowerCase(),
				check('password').isString().isLength({ min: 6 }),
			];
			await Promise.all(vali.map(validation => validation.run(req)));
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json(errors);
			}
			login(req, res);
			break;

		default:
			return res.status(404).json({ message: 'API no existe' });
	}
}

async function login(req: NextApiRequest, res: NextApiResponse<Data>) {
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
	res.status(200).json({ user: { role, name, email }, token });
}
