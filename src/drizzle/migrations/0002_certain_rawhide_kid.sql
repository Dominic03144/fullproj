ALTER TYPE "public"."user_type_enum" RENAME TO "user_type";--> statement-breakpoint
ALTER TYPE "public"."user_type" ADD VALUE 'admin';--> statement-breakpoint
ALTER TYPE "public"."user_type" ADD VALUE 'member';