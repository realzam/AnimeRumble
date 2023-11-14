CREATE TABLE `bingoReactives` (
	`id` varchar(30) NOT NULL,
	`description` varchar(250) NOT NULL,
	`respuesta` varchar(50) NOT NULL,
	CONSTRAINT `bingoReactives_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loertiaReactives` (
	`id` varchar(30) NOT NULL,
	`title` varchar(50) NOT NULL,
	`img` varchar(255),
	`imgKey` varchar(50),
	CONSTRAINT `loertiaReactives_id` PRIMARY KEY(`id`)
);
