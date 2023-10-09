CREATE TABLE `users` (
	`email` text PRIMARY KEY NOT NULL,
	`password` text NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` text PRIMARY KEY NOT NULL,
	`quizId` text NOT NULL,
	`question` text DEFAULT '' NOT NULL,
	`questionType` text NOT NULL,
	`answers` blob,
	`correctAnswer` blob,
	`correctAnswerTF` integer,
	FOREIGN KEY (`quizId`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`state` text NOT NULL
);
