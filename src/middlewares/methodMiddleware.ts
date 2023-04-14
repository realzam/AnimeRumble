import { NextApiRequest, NextApiResponse } from 'next';

type HandlerFun = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

function isString(x: string[] | string) {
	return Object.prototype.toString.call(x) === '[object String]';
}

const methodMiddleware = (handler: HandlerFun, method: string[] | string) => {
	return async (
		req: NextApiRequest,
		res: NextApiResponse<{
			message: string;
		}>,
	) => {
		if (isString(method)) {
			if (req.method !== method) {
				return res.status(404).json({ message: 'API no existe' });
			}
		}
		if (!method.includes(req.method || '')) {
			return res.status(404).json({ message: 'API no existe' });
		}

		return handler(req, res);
	};
};

export default methodMiddleware;
