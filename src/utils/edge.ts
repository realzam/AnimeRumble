import { jwtVerify, errors } from 'jose';
type EE = errors.JOSEError;
type Result<T> =
	| {
			valid: false;
			token: undefined;
	  }
	| {
			valid: true;
			token: T;
	  };
export const isValidTokenJose = async <T>(
	token?: string,
): Promise<Result<T>> => {
	if (!process.env.JWT_SECRET_SEED) {
		throw new Error('No hay semilla de JWT - Revisar varibles de entorno');
	}
	if (!token) {
		return { valid: false, token: undefined };
	}
	try {
		const secret = new TextEncoder().encode(process.env.JWT_SECRET_SEED);
		const res = await jwtVerify(token, secret);
		return { valid: true, token: res.payload as T };
	} catch (e) {
		const error = e as EE;
		console.log('isValidTokenJose');
		console.error({ ...error });
		console.error(error.message);
		return { valid: false, token: undefined };
	}
};
