import { authRouter } from '@/routes/auth.route';
import { quizRouter } from '@/routes/quizz.route';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

import { router } from './trpc';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: 'drizzle' });

export const appRouter = router({
	auth: authRouter,
	quizz: quizRouter,
});

export type AppRouter = typeof appRouter;
