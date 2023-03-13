import {
	cookie,
	Result,
	ValidationError,
	validationResult,
} from 'express-validator';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/db';
import { UserModel } from '@/db/models';
import type { IUser, IUserResponseApi } from '@/interfaces/user';
import { isValidToken, singToken } from '@/utils/utils';

type Data =
	| {
			message: string;
	  }
	| Result<ValidationError>
	| IUserResponseApi;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	switch (req.method) {
		case 'GET':
			const vali = [cookie('token').isString()];
			await Promise.all(vali.map(validation => validation.run(req)));
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json(errors);
			}
			checkJWT(req, res);
			break;

		default:
			return res.status(404).json({ message: 'API no existe' });
	}
}

async function checkJWT(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { token } = req.cookies as {
		token: string;
	};

	const resp = await isValidToken(token);
	if (!resp[0]) {
		return res
			.status(401)
			.json({ message: 'Token de autorizacion no es valido' });
	}
	const { id } = resp[1];
	await db.connect();
	const user = await UserModel.findById(id);
	await db.disconnect();

	if (!user) {
		return res.status(400).json({ message: 'No existe usuario' });
	}
	const userObj = user.toJSON<IUser>({ flattenMaps: false });
	const { role, name, email } = userObj;

	return res
		.status(200)
		.json({
			user: { role, name, email },
			token: singToken({ email, id, role }),
		});
}
