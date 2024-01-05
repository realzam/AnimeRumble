import { devProcedure, router } from '@/trpc/server/trpc';
import {
	loteriaDeck,
	loteriaGame,
	loteriaPlantilla,
	loteriaPlayer,
	loteriaSessions,
	loteriaWinners,
} from 'anime-db';

import { db } from '@/lib/db';

export const devRouter = router({
	deleteAllLoteria: devProcedure.query(async () => {
		console.log('deleteAll route dev');

		await db.delete(loteriaPlantilla).execute();
		await db.delete(loteriaDeck).execute();
		await db.delete(loteriaSessions).execute();
		await db.delete(loteriaGame).execute();
		await db.delete(loteriaWinners).execute();
		await db.delete(loteriaPlayer).execute();
	}),
});
