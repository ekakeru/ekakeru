DO $$ BEGIN
 CREATE TYPE "public"."platform" AS ENUM('eplus.jp', 'pia.jp', 'l-tike.com');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ekakeru_accounts" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "ekakeru_accounts_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ekakeru_event_enrollment_rounds" (
	"id" text PRIMARY KEY NOT NULL,
	"createdById" text NOT NULL,
	"eventId" text NOT NULL,
	"platform" "platform" NOT NULL,
	"name" text NOT NULL,
	"metadata" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ekakeru_events" (
	"id" text PRIMARY KEY NOT NULL,
	"createdById" text NOT NULL,
	"name" text NOT NULL,
	"metadata" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ekakeru_sessions" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ekakeru_submissions" (
	"id" text PRIMARY KEY NOT NULL,
	"createdById" text NOT NULL,
	"enrollmentRoundId" text NOT NULL,
	"trustworthiness" integer NOT NULL,
	"trustworthyPostures" jsonb NOT NULL,
	"payload" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ekakeru_users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ekakeru_verification_tokens" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "ekakeru_verification_tokens_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ekakeru_accounts" ADD CONSTRAINT "ekakeru_accounts_user_id_ekakeru_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ekakeru_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ekakeru_event_enrollment_rounds" ADD CONSTRAINT "ekakeru_event_enrollment_rounds_createdById_ekakeru_users_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."ekakeru_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ekakeru_event_enrollment_rounds" ADD CONSTRAINT "ekakeru_event_enrollment_rounds_eventId_ekakeru_events_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."ekakeru_events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ekakeru_events" ADD CONSTRAINT "ekakeru_events_createdById_ekakeru_users_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."ekakeru_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ekakeru_sessions" ADD CONSTRAINT "ekakeru_sessions_user_id_ekakeru_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ekakeru_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ekakeru_submissions" ADD CONSTRAINT "ekakeru_submissions_createdById_ekakeru_users_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."ekakeru_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ekakeru_submissions" ADD CONSTRAINT "ekakeru_submissions_enrollmentRoundId_ekakeru_event_enrollment_rounds_id_fk" FOREIGN KEY ("enrollmentRoundId") REFERENCES "public"."ekakeru_event_enrollment_rounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "ekakeru_accounts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "ekakeru_sessions" USING btree ("user_id");