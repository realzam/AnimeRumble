import { users } from '@/models';
import { RegisterSchema } from '@/schema/auth';
import { publicProcedure, router } from '@/trpc/server/trpc';
import { TRPCError } from '@trpc/server';
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
		const user = await db
			.select()
			.from(users)
			.where(eq(users.email, values.email));
		if (user.length > 0) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'El correo ya esta registrado',
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
