import { z } from 'zod';

import { zodCustomErrorMap } from '@/lib/zodCustomErrorMap';

z.setErrorMap(zodCustomErrorMap);
const CreateQuizSchema = z.object({
	title: z.string().min(1),
	description: z.string().optional(),
	img: z
		.object({
			url: z.string().min(1),
			key: z.string().min(1),
		})
		.optional(),
});

const GetQuizSchema = z.object({
	id: z.string().min(1),
});

const UpdateQuizSchema = z.object({
	quizId: z.string().min(1),
	questionId: z.string().min(1),
	question: z.string().optional(),
	questionType: z.enum(['Multiple', 'TF']).optional(),
	correctAnswerTF: z.boolean().optional(),
	time: z.enum(['5', '10', '15', '20', '30', '45', '60', '90']).optional(),
	points: z.enum(['standar', 'none', 'double']).optional(),
	answerUpdate: z
		.object({
			index: z.number().min(0).max(3),
			value: z.string(),
		})
		.optional(),
	correctAnswerUpdate: z
		.object({
			index: z.number().min(0).max(3),
			value: z.boolean(),
		})
		.optional(),
});

const DeleteQuestionSchema = z.object({
	quizId: z.string().min(1),
	questionId: z.string().min(1),
});

export {
	CreateQuizSchema,
	GetQuizSchema,
	UpdateQuizSchema,
	DeleteQuestionSchema,
};
