import { relations } from "drizzle-orm";
import {
  boolean,
  json,
  mysqlTable,
  primaryKey,
  smallint,
  varchar,
} from "drizzle-orm/mysql-core";

export const loteriaCards = mysqlTable("loteriaCards", {
  id: varchar("id", { length: 30 }).primaryKey().notNull(),
  title: varchar("title", { length: 50 }).notNull(),
  img: varchar("img", { length: 255 }).notNull(),
  imgKey: varchar("imgKey", { length: 100 }).notNull(),
  index: smallint("index").notNull(),
  fit: varchar("fit", { length: 5, enum: ["fill", "cover", "contain"] })
    .default("cover")
    .notNull(),
});

export const loteriaGame = mysqlTable("loteriaGame", {
  id: varchar("id", { length: 30 }).primaryKey().notNull(),
  state: varchar("state", {
    length: 9,
    enum: ["lobby", "play", "countdown", "finish"],
  })
    .default("lobby")
    .notNull(),
  currentCard: smallint("index").default(0).notNull(),
});

export const loteriaCardsToLoteriaGames = mysqlTable(
  "loteriaCardsToLoteriaGames",
  {
    cardId: varchar("cardId", { length: 30 }).notNull(),
    gameId: varchar("gameId", { length: 50 }).notNull(),
    order: smallint("order").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.cardId, t.gameId] }),
  })
);

export const playerLoteria = mysqlTable(
  "playerLoteria",
  {
    gameId: varchar("gameId", { length: 50 }).notNull(),
    userId: varchar("userId", { length: 60 }).notNull(),
    nickName: varchar("nickName", { length: 100 }).notNull(),
    online: boolean("isCorrect").default(false).notNull(),
    userType: varchar("userType", {
      length: 8,
      enum: ["guest", "register"],
    }).notNull(),
    tableCheck: json("correctAnswers").$type<boolean[]>().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.gameId] }),
  })
);

export const loteriaCardsToPlayerLoteria = mysqlTable(
  "loteriaCardsToPlayerLoteria",
  {
    cardId: varchar("cardId", { length: 30 }).notNull(),
    gameId: varchar("gameId", { length: 50 }).notNull(),
    playerId: varchar("playerId", { length: 50 }).notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.cardId, t.gameId, t.playerId] }),
  })
);

export const loteriaGameRelations = relations(loteriaGame, ({ many }) => ({
  cards: many(loteriaCardsToLoteriaGames),
  players: many(playerLoteria),
  cardsPlayer: many(loteriaCardsToPlayerLoteria),
}));

export const loteriaCardsRelations = relations(loteriaCards, ({ many }) => ({
  games: many(loteriaCardsToLoteriaGames),
  cardsPlayer: many(loteriaCardsToPlayerLoteria),
}));

export const loteriaCardsToLoteriaGamesRelations = relations(
  loteriaCardsToLoteriaGames,
  ({ one }) => ({
    card: one(loteriaCards, {
      fields: [loteriaCardsToLoteriaGames.cardId],
      references: [loteriaCards.id],
    }),
    game: one(loteriaGame, {
      fields: [loteriaCardsToLoteriaGames.gameId],
      references: [loteriaGame.id],
    }),
  })
);

export const playerLoteriaRelations = relations(
  playerLoteria,
  ({ one, many }) => ({
    game: one(loteriaGame, {
      fields: [playerLoteria.gameId],
      references: [loteriaGame.id],
    }),
    cards: many(loteriaCardsToPlayerLoteria),
  })
);

export const loteriaCardsToPlayerLoteriaRelations = relations(
  loteriaCardsToPlayerLoteria,
  ({ one }) => ({
    card: one(loteriaCards, {
      fields: [loteriaCardsToPlayerLoteria.cardId],
      references: [loteriaCards.id],
    }),
    game: one(loteriaGame, {
      fields: [loteriaCardsToPlayerLoteria.gameId],
      references: [loteriaGame.id],
    }),
    player: one(playerLoteria, {
      fields: [loteriaCardsToPlayerLoteria.playerId],
      references: [playerLoteria.userId],
    }),
  })
);
