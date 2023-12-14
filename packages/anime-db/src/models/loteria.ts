import { relations } from 'drizzle-orm';
import {
	mysqlTable,
	primaryKey,
	smallint,
	varchar,
} from 'drizzle-orm/mysql-core';

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
	state: varchar('state', { length: 8, enum: ['lobby', 'play', 'finish'] })
		.default('lobby')
		.notNull(),
	currentCard: smallint('index').default(0).notNull(),
});

export const loteriaCardsToLoteriaGames = mysqlTable(
	'loteriaCardsToLoteriaGames',
	{
		cardId: varchar('cardId', { length: 30 }).notNull(),
		gameId: varchar('gameId', { length: 30 }).notNull(),
		order: smallint('order').notNull(),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.cardId, t.gameId] }),
	}),
);

export const loteriaGameRelations = relations(loteriaGame, ({ many }) => ({
	cards: many(loteriaCardsToLoteriaGames),
	/*Modifications */
	users: many(playerLoteria),
}));

export const loteriaCardsRelations = relations(loteriaCards, ({ many }) => ({
	games: many(loteriaCardsToLoteriaGames),
}));

export const cardsToGamesRelations = relations(
	loteriaCardsToLoteriaGames,
	({ one }) => ({
		card: one(loteriaCards, {
			fields: [loteriaCardsToLoteriaGames.cardId],
			references: [loteriaCards.id],
		}),
		user: one(loteriaGame, {
			fields: [loteriaCardsToLoteriaGames.gameId],
			references: [loteriaGame.id],
		}),
	}),
);

/*Modificiations */
export const playerLoteria = mysqlTable(
	'playerLoteria',
	{
		gameId: varchar('gameId', { length: 30 }).notNull(),
		userId: varchar('userId', { length: 30 }).notNull(),
		nickName: varchar('nickName', { length: 100 }).notNull(),
		userType: varchar('userType', {
			length: 8,
			enum: ['guest', 'register'],
		}).notNull(),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.userId, t.gameId] }),
	}),
);

export const playerLoteriaRelations = relations(playerLoteria, ({ one }) => ({
	author: one(loteriaGame, {
		fields: [playerLoteria.gameId],
		references: [loteriaGame.id],
	}),
}));
