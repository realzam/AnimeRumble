import { jwtVerify } from 'jose';

export const isValidTokenJose = async <T>(token: string) => {
	if (!process.env.JWT_SECRET_SEED) {
		throw new Error('No hay semilla de JWT - Revisar varibles de entorno');
	}
	try {
		const secret = new TextEncoder().encode(process.env.JWT_SECRET_SEED);
		const res = await jwtVerify(token, secret);
		return res.payload as T;
	} catch (error) {
		console.log('isValidTokenJose');
		console.error(error);
		return undefined;
	}
};
