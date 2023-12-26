'server-only';

import { env } from '@/env.mjs';
import { jwtVerify, SignJWT, type JWTPayload } from 'jose';

export const createJWT = async (payload: JWTPayload) => {
	const secret = new TextEncoder().encode(env.SECRET_JWT_SOCKET);

	const jwt = await new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS512' })
		.setExpirationTime('3h')
		.sign(secret);

	return jwt;
};

export const verifyJWT = async <T>(token: string) => {
	const secret = new TextEncoder().encode(env.SECRET_JWT_SOCKET);
	try {
		const { payload } = await jwtVerify<T>(token, secret);
		return payload;
	} catch (error) {
		return undefined;
	}
};
