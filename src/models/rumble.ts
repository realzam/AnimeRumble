import {
	boolean,
	json,
	mysqlTable,
	tinyint,
	varchar,
} from 'drizzle-orm/mysql-core';

export const gallery = mysqlTable('gallery', {
	id: varchar('id', { length: 30 }).primaryKey().notNull(),
	order: tinyint('position').notNull(),
	img: varchar('img', { length: 255 }).notNull(),
	imgKey: varchar('imgKey', { length: 50 }).notNull(),
	question: varchar('question', { length: 255 }).notNull(),
	isMultipleOption: boolean('isMultipleOption').default(false).notNull(),
	answer: tinyint('answer').default(0).notNull(),
	options: json('options').$type<string[]>().notNull(),
});

export const soundtrack = mysqlTable('soundtracks', {
	id: varchar('id', { length: 30 }).primaryKey().notNull(),
	order: tinyint('order').notNull(),
	song: varchar('song', { length: 255 }).notNull(),
	songKey: varchar('songKey', { length: 50 }).notNull(),
	songTitle: varchar('songTitle', { length: 100 }).notNull(),
	artist: varchar('artist', { length: 100 }).notNull(),
	anime: varchar('anime', { length: 100 }).notNull(),
	img: varchar('img', { length: 255 }),
	imgKey: varchar('imgKey', { length: 50 }),
	imgFit: varchar('imgFit', {
		length: 7,
		enum: ['fill', 'cover', 'contain'],
	}).default('contain'),
});
