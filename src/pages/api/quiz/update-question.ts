import {
	ValidationError,
	check,
	matchedData,
	validationResult,
} from 'express-validator';
import formidable from 'formidable';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import { db } from '@/db';
import { QuizModel } from '@/db/models';
import { IQuiz, QuizQuestionQuery } from '@/interfaces';
import { deleteFile, uploadImage } from '@/utils/utils';
type Data =
	| {
			message: string;
	  }
	| { errors: ValidationError[] }
	| IQuiz;

function isString(x: unknown) {
	return Object.prototype.toString.call(x) === '[object String]';
}

function isBoolean(x: unknown) {
	return Object.prototype.toString.call(x) === '[object Boolean]';
}

const validations = [
	check('quizID').isMongoId(),
	check('questionID').isMongoId(),
	check('type').isIn(['Quiz', 'TrueFalse']).optional(),
	check('time').isIn(['5', '10', '20', '30', '60', '90', '120']).optional(),
	check('points').isIn(['Standar', 'Double', 'None']).optional(),
	check('question').isString().optional(),
	check('correctAnswerQuiz')
		.isArray({ max: 2, min: 2 })
		.custom(value => {
			if (
				Number.isInteger(value[0]) &&
				value[0] >= 0 &&
				value[0] <= 3 &&
				isBoolean(value[1])
			) {
				return true;
			}
			throw new Error('');
		})
		.optional(),
	check('correctAnswerTrueFalse').isBoolean().optional(),
	check('answer')
		.isArray({ max: 2, min: 2 })
		.custom(value => {
			if (
				Number.isInteger(value[0]) &&
				value[0] >= 0 &&
				value[0] <= 3 &&
				isString(value[1])
			) {
				return true;
			}
			throw new Error('');
		})
		.optional(),
	check('img').isString().optional(),
];

const router = createRouter<NextApiRequest, NextApiResponse>();
router.put('', async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const form = new formidable.IncomingForm({
		maxFiles: 1,
	});
	form.parse(req, async (error, fields, files) => {
		if (error) {
			console.error(error);
			return res.status(500).json({ message: 'Error parsing form data' });
		}
		req.body = fields;
		for (const validation of validations) {
			await validation.run(req);
		}
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const allData = matchedData(req);
		const { quizID, questionID, ...query } = allData as {
			quizID: string;
			questionID: string;
		} & QuizQuestionQuery;
		await db.connect();
		const quiz = await QuizModel.findById(quizID);
		if (!quiz) {
			return res
				.status(400)
				.json({ message: 'No existe el Quiz con el ID' + quizID });
		}
		console.log('req.body ', req.body);

		const image = files.img as formidable.File | undefined;
		const pp = `/quizzes/${quizID}/questions`;

		if (image) {
			const [ok, pathImg] = await uploadImage(image, pp, questionID);
			if (ok) {
				query.img = pathImg;
			}
		}
		if (query.img === '') {
			const question = quiz.questions.find(q => q.id === questionID);
			if (question && question.img) {
				await deleteFile(question.img);
			}
		}
		quiz.updateQuestion(questionID, query);
		await quiz.save();
		await db.disconnect();
		return res.status(200).json(quiz.toJSON<IQuiz>({ flattenMaps: false }));
	});
});
export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
};

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
