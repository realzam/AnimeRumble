import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

const users = sqliteTable('users', {
	email: text('email').primaryKey(),
	password: text('password').notNull(),
	name: text('name').notNull(),
});

export default users;
