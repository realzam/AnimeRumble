import fs from 'fs';
import path from 'path';

import { ValidationError, body, validationResult } from 'express-validator';
import formidable from 'formidable';
import imageType from 'image-type';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { readChunk } from 'read-chunk';

import { db } from '@/db';
import { QuizModel } from '@/db/models';
import { IQuizBasic } from '@/interfaces';

type Data =
	| {
			message: string;
	  }
	| IQuizBasic[]
	| IQuizBasic
	| { errors: ValidationError[] };
const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	console.log(req.query);
	const states = ['draf', 'in-progress', 'finished'];
	let state = 'draf';
	if (req.query.state) {
		state = req.query.state as string;
	}
	if (!states.includes(state)) {
		return res.status(422).json({ message: 'state no es valido' });
	}
	await await db.connect();
	const quizzes = await QuizModel.find({ status: state });
	const response: IQuizBasic[] = [];
	for (const quiz of quizzes) {
		response.push(quiz.objectBasic());
	}
	await db.disconnect();
	return res.status(200).json(response);
});

router.post(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const form = new formidable.IncomingForm({
		maxFiles: 1,
	});
	form.parse(req, async (error, fields, files) => {
		if (error) {
			console.error(error);
			res.status(500).json({ message: 'Error parsing form data' });
		} else {
			req.body = fields;
			await body('title')
				.isString()
				.withMessage('El título es requerido')
				.run(req);

			// Comprobar errores de validación
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}
			const title = fields.title as string;
			const newQuiz = new QuizModel({
				title,
				description: '',
				createdAt: Date.now(),
				questions: [{}],
			});
			const image = files.img as formidable.File;
			if (image) {
				const pattern = /image-*/;
				const buffer = await readChunk(image.filepath, { length: image.size });
				const fileInfo = await imageType(buffer);
				if (!fileInfo?.mime.match(pattern)) {
					return res.status(400).json({ message: 'image no vailid is a' });
				}
				const dirPath = path.join(
					process.cwd(),
					'public',
					'quizes',
					newQuiz.id,
				);
				if (!fs.existsSync(dirPath)) {
					fs.mkdirSync(dirPath);
				}
				newQuiz.img = `/quizes/${newQuiz.id}/overlay.${fileInfo.ext}`;
				const filePath = path.join(dirPath, 'overlay.' + fileInfo.ext);
				console.log('uwuw', newQuiz.img, filePath);

				fs.renameSync(image.filepath, filePath);
			}
			await db.connect();
			const quiz = await newQuiz.save();
			await db.disconnect();
			return res.status(200).json(quiz.objectBasic());
		}
	});
});

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

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
};
