CREATE TABLE IF NOT EXISTS "table" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"desc" text
);
