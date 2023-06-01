import jwt from 'jsonwebtoken';

import { IJWTUser } from '@/interfaces/user';

export const singToken = (
	payload: string | object | Buffer,
	expiresIn?: string | number,
) => {
	if (!process.env.JWT_SECRET_SEED) {
		throw new Error('No hay semilla de JWT - Revisar varibles de entorno');
	}
	return jwt.sign(payload, process.env.JWT_SECRET_SEED, {
		expiresIn: expiresIn || '7d',
	});
};

export const isValidToken = (
	token: string,
): Promise<[false, jwt.VerifyErrors] | [true, IJWTUser]> => {
	if (!process.env.JWT_SECRET_SEED) {
		throw new Error('No hay semilla de JWT - Revisar varibles de entorno');
	}
	return new Promise(resolve => {
		jwt.verify(token, process.env.JWT_SECRET_SEED, (err, decode) => {
			if (err) {
				resolve([false, err]);
			}
			resolve([true, decode as IJWTUser]);
		});
	});
};

export const encodeBase64 = (value: string) => {
	let result = value;
	for (let i = 0; i < 5; i++) {
		result = Buffer.from(result).toString('base64');
	}
	return result;
};

export const dencodeBase64 = (value: string) => {
	let result = value;
	for (let i = 0; i < 5; i++) {
		result = Buffer.from(result, 'base64').toString('ascii');
	}
	return result;
};
