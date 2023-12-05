import { mysqlTable, smallint, varchar } from 'drizzle-orm/mysql-core';

export const loteriaCards = mysqlTable('loteriaCards', {
	id: varchar('id', { length: 30 }).primaryKey().notNull(),
	title: varchar('title', { length: 50 }).notNull(),
	img: varchar('img', { length: 255 }).notNull(),
	imgKey: varchar('imgKey', { length: 100 }).notNull(),
	index: smallint('index').notNull(),
	fit: varchar('fit', { length: 5, enum: ['fill', 'cover', 'contain'] })
		.default('cover')
		.notNull(),
});
