import { z } from 'zod';

import { zodCustomErrorMap } from '@/lib/zodCustomErrorMap';

z.setErrorMap(zodCustomErrorMap);

const AddLoteriaCardSchema = z.object({
	title: z.string().trim().min(3),
	img: z.string().min(1),
	imgKey: z.string().min(1),
	fit: z.enum(['cover', 'fit']),
});

const FormLoteriaCardSchema = z.object({
	title: z.string().trim().min(3),
	img: z.literal<boolean>(true),
});

export { AddLoteriaCardSchema, FormLoteriaCardSchema };
