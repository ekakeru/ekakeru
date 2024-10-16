ALTER TABLE "ekakeru_event_enrollment_rounds" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "ekakeru_events" ADD COLUMN "slug" text;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ekakeru_event_enrollment_rounds_slug_udx" ON "ekakeru_event_enrollment_rounds" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ekakeru_events_slug_udx" ON "ekakeru_events" USING btree ("slug");