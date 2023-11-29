import { env } from '@/env.mjs';
import { gallery } from '@/models';
import { AddGallerySchema } from '@/schema/rumble';
import { adminProcedure, router } from '@/trpc/server/trpc';
import { TRPCError } from '@trpc/server';
import { asc } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { UTApi } from 'uploadthing/server';

import { db } from '@/lib/db';

const utapi = new UTApi({ apiKey: env.UPLOADTHING_SECRET });
export const rumbleRouter = router({
	addGallery: adminProcedure.input(AddGallerySchema).mutation(async (opts) => {
		const values = opts.input;
		if (values.answer >= values.options.length) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'La respuesta correcta no se incluye en la opciones',
			});
		}
		try {
			const res = await db.query.gallery.findMany();
			const id = nanoid();
			await db.insert(gallery).values({
				id,
				order: res.length,
				isMultipleOption: values.options.length > 1,
				...values,
			});

			const resRename = await utapi.renameFile({
				fileKey: values.imgKey,
				newName: `Rumble-Gallery-${res.length}-${id}`,
			});
			console.log('rename res', resRename);
		} catch (error) {
			console.log('rename error', error);
		}
	}),
	getGallery: adminProcedure.query(async () => {
		const res = await db.query.gallery.findMany({
			orderBy: [asc(gallery.order)],
		});
		return res;
	}),
});
