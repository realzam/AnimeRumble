import { AddBingoReactiveSchema } from '@/schema/bingo';
import { publicProcedure, router } from '@/trpc/server/trpc';
import { bingoReactives } from 'anime-db';
import { asc, eq } from 'drizzle-orm';
import { customAlphabet, urlAlphabet } from 'nanoid';

import { db } from '@/lib/db';
import { generarNumerosAleatorios } from '@/lib/utils';

export const bingoRouter = router({
	getReactives: publicProcedure.query(async () => {
		return await db.query.bingoReactives.findMany({
			orderBy: asc(bingoReactives.index),
		});
	}),
	addReactive: publicProcedure
		.input(AddBingoReactiveSchema)
		.mutation(async (opts) => {
			const values = opts.input;
			const nanoid = customAlphabet(urlAlphabet, 15);
			const idBingoReactive = nanoid();
			const index = (await db.query.bingoReactives.findMany()).length + 1;
			await db.insert(bingoReactives).values({
				id: idBingoReactive,
				index,
				...values,
			});
			const reactive = await db.query.bingoReactives.findFirst({
				where: eq(bingoReactives.id, idBingoReactive),
			});
			return reactive!;
		}),

	getRandomReactives: publicProcedure.query(async () => {
		const reactives = await db.query.bingoReactives.findMany({
			orderBy: asc(bingoReactives.index),
		});
		const random = generarNumerosAleatorios(16, 1, reactives.length);

		return random.map((i) => reactives[i - 1]);
	}),
});
