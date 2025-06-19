CREATE TYPE "public"."user_type_enum" AS ENUM('customer', 'owner', 'driver');--> statement-breakpoint
ALTER TABLE "userTable" ADD COLUMN "userType" "user_type_enum" DEFAULT 'customer' NOT NULL;