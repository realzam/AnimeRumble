import { bingoReactives } from '@/models';
import { AddBingoReactiveSchema } from '@/schema/bingo';
import { publicProcedure, router } from '@/trpc/server/trpc';
import { eq } from 'drizzle-orm';
import { customAlphabet, urlAlphabet } from 'nanoid';

import { db } from '@/lib/db';

export const bingoRouter = router({
	getReactive: publicProcedure.query(async () => {
		return await db.query.bingoReactives.findMany();
	}),
	addReactive: publicProcedure
		.input(AddBingoReactiveSchema)
		.mutation(async (opts) => {
			const values = opts.input;
			const nanoid = customAlphabet(urlAlphabet, 15);
			const idBingoReactive = nanoid();
			await db.insert(bingoReactives).values({
				id: idBingoReactive,
				...values,
			});
			const reactive = await db.query.bingoReactives.findFirst({
				where: eq(bingoReactives.id, idBingoReactive),
			});
			return reactive!;
		}),
});
