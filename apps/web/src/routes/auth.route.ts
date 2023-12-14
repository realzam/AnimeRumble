import { RegisterSchema } from '@/schema/auth';
import { publicProcedure, router } from '@/trpc/server/trpc';
import { TRPCError } from '@trpc/server';
import { users } from 'anime-db';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

import { db } from '@/lib/db';
import { hashPassword } from '@/lib/utils';

export const authRouter = router({
	register: publicProcedure.input(RegisterSchema).mutation(async (opts) => {
		const values = opts.input;
		if (values.password !== values.confirmPassword) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Las contraseñas no coiciden',
			});
		}
		const emailIsUsed = await db.query.users.findFirst({
			where: eq(users.email, values.email),
		});

		if (emailIsUsed) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'El correo ya esta registrado',
			});
		}
		const nicknameIsUsed = await db.query.users.findFirst({
			where: eq(users.email, values.nickname),
		});

		if (nicknameIsUsed) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'El Nickname ya esta ocupado, utiliza otro',
			});
		}

		await db.insert(users).values({
			...values,
			password: hashPassword(values.password),
			id: nanoid(),
		});
		return {
			message: 'goodbye!',
		};
	}),
});
