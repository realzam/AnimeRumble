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
			.min(1, { message: 'El correo debe contener al menos 1 carácter' })
			.email(),
		password: z
			.string()
			.min(6, 'La constraseña debe contener al menos 6 carácter(es)'),
		nickname: z
			.string()
			.min(1, 'El Nick name debe contener al menos 1 carácter'),
		name: z.string().min(3, 'El nombre debe contener al menos 6 carácteres'),
		confirmPassword: z
			.string()
			.min(6, 'La constraseña debe contener al menos 6 carácteres'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'La constraseñas no coinciden',
		path: ['confirmPassword'], // path of error
	});

export { LoginSchema, RegisterSchema };
