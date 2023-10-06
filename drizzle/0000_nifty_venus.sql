CREATE TABLE IF NOT EXISTS `users` (
	`email` text PRIMARY KEY NOT NULL,
	`password` text NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `questions` (
	`id` integer,
	`quizId` text NOT NULL,
	`question` text,
	`questionType` text NOT NULL,
	`answers` blob,
	FOREIGN KEY (`quizId`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `quizzes` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`state` text NOT NULL
);
