import bcrypt from 'bcryptjs';
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
			.json({ message: 'Ya existe un usuario con el mismo correo' });
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
	return res.status(200).json({ user: newUserObj, token });
};

export default methodMiddleware(
	validateMiddleware(
		handler,
		check('email').isEmail().toLowerCase(),
		check('password').isString().isLength({ min: 6 }),
		check('name').isString(),
	),
	'POST',
);