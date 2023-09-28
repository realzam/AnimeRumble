import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	email: text('email').primaryKey(),
	password: text('password'),
	name: text('name'),
});
