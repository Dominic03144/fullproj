CREATE TABLE "commentsTable" (
	"commentId" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"restaurantId" integer,
	"commentText" text NOT NULL,
	"commentType" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "commentsTable" ADD CONSTRAINT "commentsTable_userId_userTable_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."userTable"("userId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commentsTable" ADD CONSTRAINT "commentsTable_restaurantId_restaurantTable_restaurantId_fk" FOREIGN KEY ("restaurantId") REFERENCES "public"."restaurantTable"("restaurantId") ON DELETE cascade ON UPDATE no action;