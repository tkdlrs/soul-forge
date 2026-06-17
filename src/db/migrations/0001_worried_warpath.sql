ALTER TABLE `users` RENAME COLUMN "name" TO "first_name";--> statement-breakpoint
ALTER TABLE `users` ADD `last_name` text NOT NULL;