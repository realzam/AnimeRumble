import { relations } from "drizzle-orm";
import {
  boolean,
  mysqlTable,
  primaryKey,
  smallint,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { users } from "./users";

export const loteriaPlayer = mysqlTable("loteriaPlayer", {
  id: varchar("userId", { length: 60 }).primaryKey().notNull(),
  nickName: varchar("nickName", { length: 100 }).notNull(),
  online: boolean("online").default(false).notNull(),
  userType: varchar("userType", {
    length: 8,
    enum: ["guest", "register"],
  }).notNull(),
});

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
  id: varchar("id", { length: 50 }).primaryKey().notNull(),
  state: varchar("state", {
    length: 9,
    enum: ["lobby", "play", "countdown", "finish"],
  })
    .default("lobby")
    .notNull(),
  currentCard: smallint("currentCard").default(0).notNull(),
  currentCardPlayer: smallint("currentCardPlayer").default(0).notNull(),
  isPaused: boolean("isPaused").default(true).notNull(),
  date: timestamp("date").notNull(),
});

export const loteriaDeck = mysqlTable(
  "loteriaDeck",
  {
    cardId: varchar("cardId", { length: 50 }).notNull(),
    gameId: varchar("gameId", { length: 50 }).notNull(),
    order: smallint("order").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.cardId, t.gameId] }),
  })
);

export const loteriaPlantilla = mysqlTable(
  "loteriaPlantilla",
  {
    cardId: varchar("cardId", { length: 30 }).notNull(),
    gameId: varchar("gameId", { length: 50 }).notNull(),
    playerId: varchar("playerId", { length: 50 }).notNull(),
    order: smallint("order").notNull(),
    checked: boolean("checked").default(false).notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.cardId, t.gameId, t.playerId] }),
  })
);

export const loteriaWinners = mysqlTable(
  "loteriaWinners",
  {
    playerId: varchar("playerId", { length: 50 }).notNull(),
    gameId: varchar("gameId", { length: 50 }).notNull(),
    place: smallint("place").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.playerId, t.gameId] }),
  })
);

export const loteriaSessions = mysqlTable(
  "loteriaSessions",
  {
    playerId: varchar("playerId", { length: 50 }).notNull(),
    gameId: varchar("gameId", { length: 50 }).notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.playerId, t.gameId] }),
  })
);

export const loteriaPlayerRelations = relations(
  loteriaPlayer,
  ({ one, many }) => ({
    winner: one(loteriaWinners, {
      fields: [loteriaPlayer.id],
      references: [loteriaWinners.playerId],
    }),
    user: one(users, {
      fields: [loteriaPlayer.id],
      references: [users.id],
    }),
    sessions: many(loteriaSessions),
    plantillas: many(loteriaPlantilla),
  })
);

export const loteriaGameRelations = relations(loteriaGame, ({ many }) => ({
  deck: many(loteriaDeck),
  players: many(loteriaSessions),
  winners: many(loteriaWinners),
  plantilla: many(loteriaPlantilla),
}));

export const loteriaCardsRelations = relations(loteriaCards, ({ many }) => ({
  game: many(loteriaDeck),
  plantilla: many(loteriaPlantilla),
}));

export const loteriaDeckRelations = relations(loteriaDeck, ({ one }) => ({
  card: one(loteriaCards, {
    fields: [loteriaDeck.cardId],
    references: [loteriaCards.id],
  }),
  game: one(loteriaGame, {
    fields: [loteriaDeck.gameId],
    references: [loteriaGame.id],
  }),
}));

export const loteriaWinnersRelations = relations(loteriaWinners, ({ one }) => ({
  game: one(loteriaGame, {
    fields: [loteriaWinners.gameId],
    references: [loteriaGame.id],
  }),
  player: one(loteriaPlayer, {
    fields: [loteriaWinners.playerId],
    references: [loteriaPlayer.id],
  }),
}));

export const loteriaSessionsRelations = relations(
  loteriaSessions,
  ({ one }) => ({
    game: one(loteriaGame, {
      fields: [loteriaSessions.gameId],
      references: [loteriaGame.id],
    }),
    player: one(loteriaPlayer, {
      fields: [loteriaSessions.playerId],
      references: [loteriaPlayer.id],
    }),
  })
);

export const loteriaPlantillaRelations = relations(
  loteriaPlantilla,
  ({ one }) => ({
    card: one(loteriaCards, {
      fields: [loteriaPlantilla.cardId],
      references: [loteriaCards.id],
    }),
    game: one(loteriaGame, {
      fields: [loteriaPlantilla.gameId],
      references: [loteriaGame.id],
    }),
    player: one(loteriaPlayer, {
      fields: [loteriaPlantilla.playerId],
      references: [loteriaPlayer.id],
    }),
  })
);
