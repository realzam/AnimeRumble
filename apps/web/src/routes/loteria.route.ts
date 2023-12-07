'server-only';

import { env } from '@/env.mjs';
import { loteriaCards } from '@/models';
import { AddLoteriaCardSchema } from '@/schema/loteria';
import { publicProcedure, router } from '@/trpc/server/trpc';
import { asc, eq } from 'drizzle-orm';
import { customAlphabet, urlAlphabet } from 'nanoid';
import { UTApi } from 'uploadthing/server';

import { db } from '@/lib/db';
import { generarNumerosAleatorios } from '@/lib/utils';

const utapi = new UTApi({ apiKey: env.UPLOADTHING_SECRET });
export const loteriaRouter = router({
	getCards: publicProcedure.query(async () => {
		return await db.query.loteriaCards.findMany({
			orderBy: asc(loteriaCards.index),
		});
	}),
	addCard: publicProcedure
		.input(AddLoteriaCardSchema)
		.mutation(async (opts) => {
			const values = opts.input;
			const nanoid = customAlphabet(urlAlphabet, 15);
			const idLoteriaCard = nanoid();
			const index = (await db.query.loteriaCards.findMany()).length + 1;
			await db.insert(loteriaCards).values({
				id: idLoteriaCard,
				index,
				...values,
			});
			const card = await db.query.loteriaCards.findFirst({
				where: eq(loteriaCards.id, idLoteriaCard),
			});
			utapi.renameFile({
				fileKey: values.imgKey,
				newName: `Loteria-${index}-${values.title}`,
			});
			return card!;
		}),
	getRandomCards: publicProcedure.query(async () => {
		const cards = await db.query.loteriaCards.findMany({
			orderBy: asc(loteriaCards.index),
		});
		const random = generarNumerosAleatorios(20, 1, cards.length);

		return random.map((i) => cards[i - 1]);
	}),
});
