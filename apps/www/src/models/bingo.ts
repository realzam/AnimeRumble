import { mysqlTable, smallint, varchar } from 'drizzle-orm/mysql-core';

export const bingoReactives = mysqlTable('bingoReactives', {
	id: varchar('id', { length: 30 }).primaryKey().notNull(),
	description: varchar('description', { length: 250 }).notNull(),
	response: varchar('respuesta', { length: 250 }).notNull(),
	index: smallint('index').notNull(),
});
