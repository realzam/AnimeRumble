import { jwtVerify, errors } from 'jose';
type EE = errors.JOSEError;
export const isValidTokenJose = async <T>(token: string) => {
	if (!process.env.JWT_SECRET_SEED) {
		throw new Error('No hay semilla de JWT - Revisar varibles de entorno');
	}
	try {
		const secret = new TextEncoder().encode(process.env.JWT_SECRET_SEED);
		const res = await jwtVerify(token, secret);
		return res.payload as T;
	} catch (e) {
		const error = e as EE;
		console.log('isValidTokenJose');
		console.error({ ...error });
		console.error(error.message);
		return undefined;
	}
};
