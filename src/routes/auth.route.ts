import { users } from '@/db/models';
import { RegisterSchema } from '@/schema/auth';
import { publicProcedure, router } from '@/trpc/server/trpc';
import { TRPCError } from '@trpc/server';
import Database from 'better-sqlite3';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import { hashPassword } from '@/lib/utils';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

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
		await db
			.insert(users)
			.values({ ...values, password: hashPassword(values.password) })
			.run();
		return {
			message: 'goodbye!',
		};
	}),
});
