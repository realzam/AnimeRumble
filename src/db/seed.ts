import { users } from '@/db/models';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import { hashPassword } from '@/lib/utils';

const main = async () => {
	const sqlite = new Database('sqlite.db');
	const db = drizzle(sqlite);
	const data: (typeof users.$inferInsert)[] = [
		{
			email: 'nino@google.com',
			name: 'nino',
			password: hashPassword('123456'),
		},
	];

	console.log('Seed start');
	await db.insert(users).values(data).run();
	console.log('Seed done');

	process.exit(0);
};

main();
