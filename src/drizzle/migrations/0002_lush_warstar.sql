CREATE TYPE "public"."status_enum" AS ENUM('pending', 'accepted', 'rejected', 'delivered');--> statement-breakpoint
ALTER TABLE "orderStatusTable" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "ordersTable" ADD COLUMN "status" "status_enum" DEFAULT 'pending' NOT NULL;