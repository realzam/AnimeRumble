import bcrypt from 'bcryptjs';
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
	| { token: string; user: IUser };

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	switch (req.method) {
		case 'POST':
			const vali = [
				check('email').isEmail().toLowerCase(),
				check('password').isString().isLength({ min: 6 }),
				check('name').isString(),
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
	const { email, password, name } = req.body as {
		email: string;
		password: string;
		name: string;
	};
	await db.connect();
	const user = await UserModel.findOne({ email });
	if (user) {
		return res
			.status(400)
			.json({ message: 'ya esxite un usuario con el mismo correo' });
	}
	const newUser = new UserModel({
		email,
		name,
		password: bcrypt.hashSync(password),
	});
	try {
		await newUser.save({ validateBeforeSave: true });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Algo salio mal' });
	}
	await db.disconnect();
	const newUserObj = newUser.toJSON<IUser>({ flattenMaps: false });
	const { id, role } = newUserObj;
	const token = singToken({ email, id, role, name });
	res.status(200).json({ user: newUserObj, token });
}
