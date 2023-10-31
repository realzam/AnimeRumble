import path from 'path';
import { type Config } from 'drizzle-kit';

export default {
	schema: './src/db/models/*',
	out: './drizzle',
	driver: 'better-sqlite',
	dbCredentials: {
		url: path.resolve(__dirname, 'sqlite.db'),
	},
} satisfies Config;
