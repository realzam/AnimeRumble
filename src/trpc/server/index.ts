import { authRouter } from '@/routes/auth.route';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

import { router } from './trpc';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: 'drizzle' });

// export const appRouter = router({
// 	getTodos: publicProcedure.query(async () => {
// 		return await db.select().from(todos).all();
// 	}),
// 	addTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
// 		await db.insert(todos).values({ content: opts.input, done: 0 }).run();
// 		return true;
// 	}),
// 	setDone: publicProcedure
// 		.input(
// 			z.object({
// 				id: z.number(),
// 				done: z.number(),
// 			}),
// 		)
// 		.mutation(async (opts) => {
// 			await db
// 				.update(todos)
// 				.set({ done: opts.input.done })
// 				.where(eq(todos.id, opts.input.id))
// 				.run();
// 			return true;
// 		}),
// });

export const appRouter = router({
	auth: authRouter,
});

export type AppRouter = typeof appRouter;
