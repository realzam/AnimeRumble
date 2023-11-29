import { z } from 'zod';

import { zodCustomErrorMap } from '@/lib/zodCustomErrorMap';

z.setErrorMap(zodCustomErrorMap);
const AddGallerySchema = z.object({
	question: z.string().min(1),
	img: z.string().min(1),
	imgKey: z.string().min(1),
	answer: z.number().nonnegative(),
	options: z.string().array(),
});

const FormGallerySchema = z
	.object({
		question: z.string().min(3),
		isMultiple: z.boolean(),
		checked: z.number().nonnegative().max(3),
		hasImg: z.literal<boolean>(true),
		option1: z.string().min(1),
		option2: z.string().optional(),
		option3: z.string().optional(),
		option4: z.string().optional(),
	})
	.superRefine((val, ctx) => {
		if (val.isMultiple) {
			if (!val.option2 || val.option2.length < 1) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_small,
					minimum: 1,
					type: 'string',
					inclusive: true,
					message: 'Too short',
					path: ['option2'],
				});
			}

			if (!val.option3 || val.option3.length < 1) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_small,
					minimum: 1,
					type: 'string',
					inclusive: true,
					message: 'Too short',
					path: ['option3'],
				});
			}

			if (!val.option4 || val.option4.length < 1) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_small,
					minimum: 1,
					type: 'string',
					inclusive: true,
					message: 'Too short',
					path: ['option4'],
				});
			}
		}
	});

export { AddGallerySchema, FormGallerySchema };
