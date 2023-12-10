import { json, mysqlTable, smallint, varchar } from 'drizzle-orm/mysql-core';

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

export const loteriaGame = mysqlTable('loteriaGame', {
	id: varchar('id', { length: 30 }).primaryKey().notNull(),
	deckPlayed: json('deckPlayed').$type<string[]>().notNull(),
	state: varchar('state', { length: 8, enum: ['lobby', 'play', 'finish'] })
		.default('lobby')
		.notNull(),
	currentCard: smallint('index').default(0).notNull(),
	// speed: smallint('speed').notNull(),
});
