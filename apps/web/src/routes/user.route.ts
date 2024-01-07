import { UserUpdateSchema } from '@/schema/user';
import { adminProcedure, router, userProcedure } from '@/trpc/server/trpc';
import { TRPCError } from '@trpc/server';
import { users } from 'anime-db';
import { eq } from 'drizzle-orm';

import { db } from '@/lib/db';

export const userRouter = router({
	updateUser: userProcedure.input(UserUpdateSchema).mutation(async (opts) => {
		const { nickName } = opts.input;
		if (nickName) {
			const nickNameIsUsed = await db.query.users.findFirst({
				where: eq(users.nickName, nickName),
			});
			if (nickNameIsUsed) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'El nickName ya esta en uso, escoge otro',
				});
			}
		}
		await db
			.update(users)
			.set({
				nickName,
			})
			.where(eq(users.id, opts.ctx.session.user.id));

		return {
			message: 'goodbye!',
		};
	}),
	getMemembers: adminProcedure.query(async () => {
		const members = await db.query.users.findMany({
			columns: {
				password: false,
				emailVerified: false,
			},
		});
		return members;
	}),
});
