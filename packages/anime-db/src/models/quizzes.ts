import { relations } from "drizzle-orm";
import {
  boolean,
  int,
  json,
  mysqlTable,
  smallint,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";

import { users } from "./users";

export const quizzes = mysqlTable("quizzes", {
  id: varchar("id", { length: 30 }).primaryKey().notNull(),
  title: varchar("title", { length: 50 }).notNull(),
  description: varchar("description", { length: 150 }).default("").notNull(),
  img: varchar("img", { length: 255 }),
  imgKey: varchar("imgKey", { length: 100 }),
  state: varchar("state", {
    length: 8,
    enum: ["active", "finished", "draft"],
  }).notNull(),
  endQuiz: timestamp("endQuiz", { mode: "string" }),
});

export const questions = mysqlTable("questions", {
  quizId: varchar("quizId", { length: 30 }).notNull(),
  position: tinyint("position").notNull(),
  id: varchar("id", { length: 30 }).primaryKey().notNull(),
  question: varchar("question", { length: 100 }).default("").notNull(),
  questionType: varchar("questionType", { length: 8, enum: ["Multiple", "TF"] })
    .default("Multiple")
    .notNull(),
  time: varchar("time", {
    length: 2,
    enum: ["5", "10", "15", "20", "30", "45", "60", "90"],
  })
    .default("10")
    .notNull(),
  points: varchar("points", {
    length: 7,
    enum: ["standar", "none", "double"],
  })
    .default("standar")
    .notNull(),
  answers: json("answers").$type<string[]>().notNull(),
  correctAnswers: json("correctAnswers").$type<boolean[]>().notNull(),
  correctAnswerTF: boolean("correctAnswerTF"),
  hasError: boolean("hasError").default(true).notNull(),
  errors: json("errors").$type<string[]>().notNull(),
  modified: boolean("modified").default(false).notNull(),
  img: varchar("img", { length: 255 }),
  imgKey: varchar("imgKey", { length: 100 }),
});

export const answers = mysqlTable("answers", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  user: varchar("user", { length: 255 }).notNull(),
  quizId: varchar("quizId", { length: 30 }).notNull(),
  questionId: varchar("questionId", { length: 30 }).notNull(),
  time: varchar("time", { length: 8 }).notNull(),
  points: smallint("points").notNull(),
  isCorrect: boolean("isCorrect").notNull(),
  answer: tinyint("answer"),
  answerTF: boolean("answerTF"),
  order: tinyint("order").notNull(),
  sessionId: varchar("sessionId", { length: 50 }).notNull(),
});

export const quizSessions = mysqlTable("quizSessions", {
  id: varchar("id", { length: 50 }).primaryKey().notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  quizId: varchar("quizId", { length: 50 }).notNull(),
  index: tinyint("index").default(0).notNull(),
  maxEnd: timestamp("maxEnd").notNull(),
  summaryPoints: int("summaryPoints").default(0).notNull(),
});

export const quizzesRelations = relations(quizzes, ({ many }) => ({
  questions: many(questions),
  answers: many(answers),
  sessions: many(quizSessions),
}));

export const questionsRelations = relations(questions, ({ one }) => ({
  quiz: one(quizzes, {
    fields: [questions.quizId],
    references: [quizzes.id],
  }),
}));

export const answersRelations = relations(answers, ({ one }) => ({
  user: one(users, {
    fields: [answers.user],
    references: [users.id],
  }),
  quiz: one(quizzes, {
    fields: [answers.quizId],
    references: [quizzes.id],
  }),
  questions: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
  sessions: one(quizSessions, {
    fields: [answers.sessionId],
    references: [quizSessions.id],
  }),
}));

export const quizSessionsRelations = relations(
  quizSessions,
  ({ one, many }) => ({
    user: one(users, {
      fields: [quizSessions.userId],
      references: [users.id],
    }),
    quiz: one(quizzes, {
      fields: [quizSessions.quizId],
      references: [quizzes.id],
    }),
    answers: many(answers),
  })
);
