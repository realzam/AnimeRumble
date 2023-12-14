import { env } from '@/env.mjs';
import {
	AddGallerySchema,
	AddJigsaw,
	AddSoundtrackSchema,
} from '@/schema/rumble';
import { adminProcedure, router } from '@/trpc/server/trpc';
import { TRPCError } from '@trpc/server';
import { gallery, jigsaws, soundtrack } from 'anime-db';
import { asc, eq } from 'drizzle-orm';
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
	addSoundtrack: adminProcedure
		.input(AddSoundtrackSchema)
		.mutation(async (opts) => {
			const { img, ...values } = opts.input;
			const res = await db.query.soundtrack.findMany();
			const id = nanoid();
			await db.insert(soundtrack).values({
				id,
				order: res.length,
				...values,
				img: img?.url,
				imgKey: img?.key,
				imgFit: img?.fit,
			});
			const resRename = await utapi.renameFile({
				fileKey: values.songKey,
				newName: `Rumble-Soundtrack-${res.length}-${id}`,
			});

			if (img) {
				console.log(
					'rename portada',
					img.key,
					`Rumble-Song-Img-${res.length}-${id}`,
				);
				await utapi.renameFile({
					fileKey: img.key,
					newName: `Rumble-Song-Img-${res.length}-${id}`,
				});
			}
			console.log('rename res', resRename);
		}),
	getSoundtrack: adminProcedure.query(async () => {
		const res = await db.query.soundtrack.findMany({
			orderBy: [asc(soundtrack.order)],
		});
		return res;
	}),
	addJigsaw: adminProcedure.input(AddJigsaw).mutation(async (opts) => {
		const { pid } = opts.input;
		const res = await fetch('https://www.jigsawplanet.com/?rc=play&pid=' + pid);
		if (!res.ok) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'No existe el rompecabezas en jigsawplanet',
			});
		}
		const order = (await db.query.jigsaws.findMany()).length;
		const exist = await db.query.jigsaws.findFirst({
			where: eq(jigsaws.jigsawID, pid),
		});
		if (exist) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'El rompecabezas ya esta agregado',
			});
		}
		const id = nanoid();
		const body = await res.text();
		const imgJisaw = getValuePropertie('puzzleImage', body);
		const imgRes = await utapi.uploadFilesFromUrl(imgJisaw);
		if (imgRes.error) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'No se puedo obtener la imagen en jigsawplanet',
			});
		}
		const { key, url } = imgRes.data;
		const name = getValuePropertie('puzzleName', body);
		await db.insert(jigsaws).values({
			id,
			order,
			jigsawID: pid,
			img: url,
			imgKey: key,
			name,
		});
		await utapi.renameFile({
			fileKey: key,
			newName: `Jigsaw-${order}-${name}-${id}`,
		});
	}),
	getJigsaws: adminProcedure.query(async () => {
		const res = await db.query.jigsaws.findMany({
			orderBy: [asc(jigsaws.order)],
		});
		return res;
	}),
});

const getValuePropertie = (property: string, content: string) => {
	const cont = content.replace(/\s+/g, '');
	const start = cont.indexOf(property + '":"') + property.length + 3;
	const newCont = cont.substring(start);
	const end = newCont.indexOf('"');
	return newCont.substring(0, end).replace(/\\+/g, '');
};
