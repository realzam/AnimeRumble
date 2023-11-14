import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const loertiaReactives = mysqlTable('loertiaReactives', {
	id: varchar('id', { length: 30 }).primaryKey().notNull(),
	title: varchar('title', { length: 50 }).notNull(),
	img: varchar('img', { length: 255 }),
	imgKey: varchar('imgKey', { length: 50 }),
});
