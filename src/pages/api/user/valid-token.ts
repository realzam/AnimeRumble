import { cookie } from 'express-validator';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/db';
import { UserModel } from '@/db/models';
import { IUser, IUserResponseApi } from '@/interfaces/user';
import { methodMiddleware, validateMiddleware } from '@/middlewares';
import { isValidToken, singToken } from '@/utils/utils';

type Data =
	| {
			message: string;
	  }
	| IUserResponseApi;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
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
		return res.status(200).json({
			user: { role, name, email },
			token: singToken({ email, id, role }),
		});
	} catch (error) {
		console.log('valid-token ERROR');
		console.error(error);
		return res.status(500).json({ message: 'SERVER ERROR :(' });
	}
};

export default methodMiddleware(
	validateMiddleware(handler, cookie('token').isString()),
	'GET',
);
