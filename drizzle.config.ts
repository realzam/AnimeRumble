import { type Config } from 'drizzle-kit';

export default {
	schema: './src/models/*',
	out: './drizzle',
	driver: 'better-sqlite',
	dbCredentials: {
		url: 'sqlite.db',
	},
} satisfies Config;
