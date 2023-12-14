'server-only';

import { env } from '@/env.mjs';
import { SignJWT, type JWTPayload } from 'jose';

export const createJWT = async (payload: JWTPayload) => {
	const secret = new TextEncoder().encode(env.SECRET_JWT_SOCKET);

	const jwt = await new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS512' })
		.setExpirationTime('3h')
		.sign(secret);

	return jwt;
};
