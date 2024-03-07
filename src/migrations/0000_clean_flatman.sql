CREATE TABLE IF NOT EXISTS "cars" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_name" text NOT NULL,
	"description" text DEFAULT 'This is a car',
	"model" text NOT NULL,
	"year" text NOT NULL,
	"color" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"milage" integer
);
