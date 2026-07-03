DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `skills` ALTER COLUMN "icon" TO "icon" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);