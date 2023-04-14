import {
	validationResult,
	ValidationChain,
	ValidationError,
} from 'express-validator';
import { NextApiRequest, NextApiResponse } from 'next';

type HandlerFun = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const validateMiddleware = (
	handler: HandlerFun,
	...validations: ValidationChain[]
) => {
	return async (
		req: NextApiRequest,
		res: NextApiResponse<{ errors: ValidationError[] }>,
	) => {
		await Promise.all(validations.map(validation => validation.run(req)));
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return handler(req, res);
		}
		return res.status(422).json({ errors: errors.array() });
	};
};

export default validateMiddleware;
