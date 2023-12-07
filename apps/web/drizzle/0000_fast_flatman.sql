CREATE TABLE `bingoReactives` (
	`id` varchar(30) NOT NULL,
	`description` varchar(250) NOT NULL,
	`respuesta` varchar(250) NOT NULL,
	`index` smallint NOT NULL,
	CONSTRAINT `bingoReactives_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loteriaCards` (
	`id` varchar(30) NOT NULL,
	`title` varchar(50) NOT NULL,
	`img` varchar(255) NOT NULL,
	`imgKey` varchar(100) NOT NULL,
	`index` smallint NOT NULL,
	`fit` varchar(5) NOT NULL DEFAULT 'cover',
	CONSTRAINT `loteriaCards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `answers` (
	`id` varchar(255) NOT NULL,
	`user` varchar(255) NOT NULL,
	`quizId` varchar(30) NOT NULL,
	`questionId` varchar(30) NOT NULL,
	`time` varchar(8) NOT NULL,
	`points` smallint NOT NULL,
	`isCorrect` boolean NOT NULL,
	`answer` tinyint,
	`answerTF` boolean,
	`order` tinyint NOT NULL,
	CONSTRAINT `answers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`quizId` varchar(30) NOT NULL,
	`position` tinyint NOT NULL,
	`id` varchar(30) NOT NULL,
	`question` varchar(100) NOT NULL DEFAULT '',
	`questionType` varchar(8) NOT NULL DEFAULT 'Multiple',
	`time` varchar(2) NOT NULL DEFAULT '10',
	`points` varchar(7) NOT NULL DEFAULT 'standar',
	`answers` json NOT NULL,
	`correctAnswers` json NOT NULL,
	`correctAnswerTF` boolean,
	`hasError` boolean NOT NULL DEFAULT true,
	`errors` json NOT NULL,
	`modified` boolean NOT NULL DEFAULT false,
	`img` varchar(255),
	`imgKey` varchar(100),
	CONSTRAINT `questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` varchar(30) NOT NULL,
	`title` varchar(50) NOT NULL,
	`description` varchar(150) NOT NULL DEFAULT '',
	`img` varchar(255),
	`imgKey` varchar(100),
	`state` varchar(8) NOT NULL,
	`endQuiz` timestamp,
	CONSTRAINT `quizzes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(2048),
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT (now()),
	`image` varchar(255),
	`role` varchar(6) NOT NULL DEFAULT 'player',
	`password` varchar(255),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE TABLE `gallery` (
	`id` varchar(30) NOT NULL,
	`position` tinyint NOT NULL,
	`img` varchar(255) NOT NULL,
	`imgKey` varchar(100) NOT NULL,
	`question` varchar(255) NOT NULL,
	`isMultipleOption` boolean NOT NULL DEFAULT false,
	`answer` tinyint NOT NULL DEFAULT 0,
	`options` json NOT NULL,
	CONSTRAINT `gallery_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `soundtracks` (
	`id` varchar(30) NOT NULL,
	`order` tinyint NOT NULL,
	`song` varchar(255) NOT NULL,
	`songKey` varchar(100) NOT NULL,
	`songTitle` varchar(100) NOT NULL,
	`artist` varchar(100) NOT NULL,
	`anime` varchar(200) NOT NULL,
	`img` varchar(255),
	`imgKey` varchar(100),
	`imgFit` varchar(7) DEFAULT 'contain',
	CONSTRAINT `soundtracks_id` PRIMARY KEY(`id`)
);
