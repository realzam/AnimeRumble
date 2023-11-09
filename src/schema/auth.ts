import { z } from 'zod';

import { zodCustomErrorMap } from '@/lib/zodCustomErrorMap';

z.setErrorMap(zodCustomErrorMap);
const LoginSchema = z.object({
	email: z.string().min(1).email(),
	password: z
		.string()
		.min(6, 'La constraseña debe contener al menos 6 carácter(es)'),
});

const RegisterSchema = z
	.object({
		email: z
			.string()
			.min(1, { message: 'El correo debe contener al menos 1 carácter(es)' })
			.email(),
		password: z
			.string()
			.min(6, 'La constraseña debe contener al menos 6 carácter(es)'),
		name: z.string().min(3, 'El nombre debe contener al menos 6 carácter(es)'),
		confirmPassword: z
			.string()
			.min(6, 'La constraseña debe contener al menos 6 carácter(es)'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'La constraseñas no coinciden',
		path: ['confirmPassword'], // path of error
	});

export { LoginSchema, RegisterSchema };
