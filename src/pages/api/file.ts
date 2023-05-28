import fs from 'fs';
import path from 'path';

import { query, validationResult } from 'express-validator';
import { fileTypeFromFile } from 'file-type';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(
	query('path').isString().notEmpty().trim(),
	(req: NextApiRequest, res: NextApiResponse) => {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res.send({ errors: [result.array()[0]] });
		}
		const { path: pathRequest } = req.query as { path: string };
		const pathImage = path.join(process.cwd(), 'files', pathRequest as string);
		fs.readFile(pathImage, async (err, data) => {
			if (!err && data) {
				const a = await fileTypeFromFile(pathImage);
				if (a) {
					return res.status(200).setHeader('content-type', a.mime).send(data);
				}
			} else {
				return res.status(404).send(null);
			}
		});
	},
);

export default router.handler({
	onError: (err, req, res) => {
		const e = err as Error;
		console.error(e.stack);
		res.status(501).json({ error: `Sorry something Happened! ${e.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});
