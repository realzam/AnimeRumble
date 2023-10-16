import { z } from 'zod';

import { zodCustomErrorMap } from '@/lib/zodCustomErrorMap';

z.setErrorMap(zodCustomErrorMap);
const CreateQuizSchema = z.object({
	title: z.string().min(1),
});

const GetQuizSchema = z.object({
	id: z.string().min(1),
});

const UpdateQuizSchema = z.object({
	quizId: z.string().min(1),
	questionId: z.string().min(1),

	question: z.string(),
	questionType: z.enum(['Multiple', 'TF']).optional(),

	correctAnswerTF: z.boolean().optional(),
});

export { CreateQuizSchema, GetQuizSchema, UpdateQuizSchema };
