import { z } from 'zod';

import { zodCustomErrorMap } from '@/lib/zodCustomErrorMap';

z.setErrorMap(zodCustomErrorMap);
const CreateQuizSchema = z.object({
	title: z.string().trim().min(1),
	description: z.string().trim().optional(),
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
	question: z.string().trim().optional(),
	questionType: z.enum(['Multiple', 'TF']).optional(),
	correctAnswerTF: z.boolean().optional(),
	time: z.enum(['5', '10', '15', '20', '30', '45', '60', '90']).optional(),
	points: z.enum(['standar', 'none', 'double']).optional(),
	answerUpdate: z
		.object({
			index: z.number().min(0).max(3),
			value: z.string().trim(),
		})
		.optional(),
	correctAnswerUpdate: z
		.object({
			index: z.number().min(0).max(3),
			value: z.boolean(),
		})
		.optional(),
	img: z
		.object({
			url: z.string().min(1).nullable(),
			key: z.string().min(1).nullable(),
		})
		.optional(),
});

const DeleteQuestionSchema = z.object({
	quizId: z.string().min(1),
	questionId: z.string().min(1),
});

const ModifiedQuestionSchema = z.object({
	questionId: z.string().min(1),
});

const ShortQuestionsSchema = z.object({
	quizId: z.string().min(1),
	questionId: z.string().min(1),
	newPosition: z.number().nonnegative(),
});

const CustomDateSchema = z.string().refine(
	(dateString) => {
		// Puedes usar una expresión regular para validar el formato de la cadena de fecha
		const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
		return regex.test(dateString);
	},
	{
		message: 'La cadena de fecha debe tener el formato "YYYY-MM-DD HH:mm:ss"',
	},
);

const AsignateQuizSchema = z.object({
	quizId: z.string().min(1),
	date: CustomDateSchema,
});

export {
	CreateQuizSchema,
	GetQuizSchema,
	UpdateQuizSchema,
	DeleteQuestionSchema,
	ShortQuestionsSchema,
	ModifiedQuestionSchema,
	AsignateQuizSchema,
};
