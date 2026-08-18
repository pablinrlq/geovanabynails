CREATE TABLE `bookings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`service_id` text NOT NULL,
	`service_title` text NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_bookings_created_at` ON `bookings` (`created_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_bookings_date_time_unique` ON `bookings` (`date`,`time`) WHERE "bookings"."status" != 'cancelled';--> statement-breakpoint
PRAGMA optimize;
