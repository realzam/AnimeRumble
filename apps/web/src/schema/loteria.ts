import { z } from 'zod';

import { zodCustomErrorMap } from '@/lib/zodCustomErrorMap';

z.setErrorMap(zodCustomErrorMap);

export const AddLoteriaCardSchema = z.object({
	title: z.string().trim().min(3),
	img: z.string().min(1),
	imgKey: z.string().min(1),
	fit: z.enum(['fill', 'cover', 'contain']),
});

export const FormLoteriaCardSchema = z.object({
	title: z.string().trim().min(3),
	img: z.literal<boolean>(true),
});

export const JoinToLoteriaSchema = z.object({
	nickName: z.string().min(1),
});

export const LoginToLoteriaSchema = z.object({
	jwt: z.string().min(10),
});
