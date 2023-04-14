import { check, matchedData } from 'express-validator';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/db';
import { QuizModel } from '@/db/models';
import { IQuiz, QuizQuestionQuery } from '@/interfaces';
import { methodMiddleware, validateMiddleware } from '@/middlewares';
type Data =
	| {
			message: string;
	  }
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

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const allData = matchedData(req);
	const { quizID, questionID, ...query } = allData as {
		quizID: string;
		questionID: string;
	} & QuizQuestionQuery;
	console.log('updateQuestion', { query });

	await db.connect();
	const quiz = await QuizModel.findById(quizID);
	if (!quiz) {
		return res
			.status(400)
			.json({ message: 'No existe el Quiz con el ID' + quizID });
	}
	quiz.updateQuestion(questionID, query);
	await quiz.save();
	await db.disconnect();
	return res.status(200).json(quiz.toJSON<IQuiz>({ flattenMaps: false }));
};

export default methodMiddleware(
	validateMiddleware(handler, ...validations),
	'PUT',
);
