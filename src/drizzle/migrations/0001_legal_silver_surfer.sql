CREATE TYPE "public"."userType" AS ENUM('member', 'admin', 'driver', 'owner');--> statement-breakpoint
CREATE TABLE "addressTable" (
	"addressId" serial PRIMARY KEY NOT NULL,
	"streetAddress" text NOT NULL,
	"streetAddress2" text,
	"zipCode" text NOT NULL,
	"deliveryInstructions" text,
	"userId" integer NOT NULL,
	"cityId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categoryTable" (
	"categoryId" serial PRIMARY KEY NOT NULL,
	"categoryName" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cityTable" (
	"cityId" serial PRIMARY KEY NOT NULL,
	"cityName" text NOT NULL,
	"stateId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "commentTable" (
	"commentId" serial PRIMARY KEY NOT NULL,
	"orderId" integer NOT NULL,
	"userId" integer NOT NULL,
	"commentText" text NOT NULL,
	"isComplaint" boolean DEFAULT false,
	"isPraise" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "driverTable" (
	"driverId" serial PRIMARY KEY NOT NULL,
	"carMake" text NOT NULL,
	"carModel" text NOT NULL,
	"carYear" integer NOT NULL,
	"userId" integer NOT NULL,
	"online" boolean DEFAULT false,
	"delivering" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "menuItemTable" (
	"menuId" serial PRIMARY KEY NOT NULL,
	"menuName" text NOT NULL,
	"restaurantId" integer NOT NULL,
	"categoryId" integer NOT NULL,
	"description" text NOT NULL,
	"ingredients" text NOT NULL,
	"price" numeric(10, 2),
	"active" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orderMenuItemTable" (
	"orderMenuItemId" serial PRIMARY KEY NOT NULL,
	"orderId" integer NOT NULL,
	"menuItemId" integer NOT NULL,
	"quantity" integer NOT NULL,
	"itemPrice" numeric(10, 2) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"comment" text
);
--> statement-breakpoint
CREATE TABLE "orderStatusTable" (
	"orderStatusId" serial PRIMARY KEY NOT NULL,
	"orderId" integer NOT NULL,
	"statusCatalogId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ordersTable" (
	"ordersId" serial PRIMARY KEY NOT NULL,
	"restaurantId" integer NOT NULL,
	"estimatedDeliveryTime" timestamp NOT NULL,
	"actualDeliveryTime" timestamp,
	"deliveryAddressId" integer NOT NULL,
	"userId" integer NOT NULL,
	"driverId" integer NOT NULL,
	"price" numeric(10, 2),
	"discount" numeric(10, 2) DEFAULT '0.00',
	"finalPrice" numeric(10, 2) NOT NULL,
	"comment" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "restaurantOwnerTable" (
	"restaurantOwnerId" serial PRIMARY KEY NOT NULL,
	"restaurantId" integer NOT NULL,
	"ownerId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "restaurantTable" (
	"restaurantId" serial PRIMARY KEY NOT NULL,
	"restaurantName" text NOT NULL,
	"streetAddress" text NOT NULL,
	"zipCode" text NOT NULL,
	"cityId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stateTable" (
	"stateId" serial PRIMARY KEY NOT NULL,
	"stateName" text NOT NULL,
	"stateCode" text NOT NULL,
	CONSTRAINT "stateTable_stateCode_unique" UNIQUE("stateCode")
);
--> statement-breakpoint
CREATE TABLE "statusCatalogTable" (
	"statusCatalogId" serial PRIMARY KEY NOT NULL,
	"statusCatalogName" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userTable" (
	"userId" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"contactPhone" text NOT NULL,
	"phoneVerified" boolean DEFAULT false,
	"email" text NOT NULL,
	"emailVerified" boolean DEFAULT false,
	"confirmationCode" text,
	"password" text NOT NULL,
	"userType" "userType" DEFAULT 'member',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "userTable_contactPhone_unique" UNIQUE("contactPhone"),
	CONSTRAINT "userTable_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DROP TABLE "address" CASCADE;--> statement-breakpoint
DROP TABLE "category" CASCADE;--> statement-breakpoint
DROP TABLE "city" CASCADE;--> statement-breakpoint
DROP TABLE "comment" CASCADE;--> statement-breakpoint
DROP TABLE "driver" CASCADE;--> statement-breakpoint
DROP TABLE "menu_item" CASCADE;--> statement-breakpoint
DROP TABLE "order_menu_item" CASCADE;--> statement-breakpoint
DROP TABLE "order_status" CASCADE;--> statement-breakpoint
DROP TABLE "orders" CASCADE;--> statement-breakpoint
DROP TABLE "restaurant" CASCADE;--> statement-breakpoint
DROP TABLE "restaurant_owner" CASCADE;--> statement-breakpoint
DROP TABLE "state" CASCADE;--> statement-breakpoint
DROP TABLE "status_catalog" CASCADE;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "addressTable" ADD CONSTRAINT "addressTable_userId_userTable_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."userTable"("userId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "addressTable" ADD CONSTRAINT "addressTable_cityId_cityTable_cityId_fk" FOREIGN KEY ("cityId") REFERENCES "public"."cityTable"("cityId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cityTable" ADD CONSTRAINT "cityTable_stateId_stateTable_stateId_fk" FOREIGN KEY ("stateId") REFERENCES "public"."stateTable"("stateId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commentTable" ADD CONSTRAINT "commentTable_orderId_ordersTable_ordersId_fk" FOREIGN KEY ("orderId") REFERENCES "public"."ordersTable"("ordersId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commentTable" ADD CONSTRAINT "commentTable_userId_userTable_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."userTable"("userId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "driverTable" ADD CONSTRAINT "driverTable_userId_userTable_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."userTable"("userId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menuItemTable" ADD CONSTRAINT "menuItemTable_restaurantId_restaurantTable_restaurantId_fk" FOREIGN KEY ("restaurantId") REFERENCES "public"."restaurantTable"("restaurantId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menuItemTable" ADD CONSTRAINT "menuItemTable_categoryId_categoryTable_categoryId_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categoryTable"("categoryId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderMenuItemTable" ADD CONSTRAINT "orderMenuItemTable_orderId_ordersTable_ordersId_fk" FOREIGN KEY ("orderId") REFERENCES "public"."ordersTable"("ordersId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderMenuItemTable" ADD CONSTRAINT "orderMenuItemTable_menuItemId_menuItemTable_menuId_fk" FOREIGN KEY ("menuItemId") REFERENCES "public"."menuItemTable"("menuId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderStatusTable" ADD CONSTRAINT "orderStatusTable_orderId_ordersTable_ordersId_fk" FOREIGN KEY ("orderId") REFERENCES "public"."ordersTable"("ordersId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderStatusTable" ADD CONSTRAINT "orderStatusTable_statusCatalogId_statusCatalogTable_statusCatalogId_fk" FOREIGN KEY ("statusCatalogId") REFERENCES "public"."statusCatalogTable"("statusCatalogId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordersTable" ADD CONSTRAINT "ordersTable_restaurantId_restaurantTable_restaurantId_fk" FOREIGN KEY ("restaurantId") REFERENCES "public"."restaurantTable"("restaurantId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordersTable" ADD CONSTRAINT "ordersTable_deliveryAddressId_addressTable_addressId_fk" FOREIGN KEY ("deliveryAddressId") REFERENCES "public"."addressTable"("addressId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordersTable" ADD CONSTRAINT "ordersTable_userId_userTable_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."userTable"("userId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordersTable" ADD CONSTRAINT "ordersTable_driverId_driverTable_driverId_fk" FOREIGN KEY ("driverId") REFERENCES "public"."driverTable"("driverId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurantOwnerTable" ADD CONSTRAINT "restaurantOwnerTable_restaurantId_restaurantTable_restaurantId_fk" FOREIGN KEY ("restaurantId") REFERENCES "public"."restaurantTable"("restaurantId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurantOwnerTable" ADD CONSTRAINT "restaurantOwnerTable_ownerId_userTable_userId_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."userTable"("userId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurantTable" ADD CONSTRAINT "restaurantTable_cityId_cityTable_cityId_fk" FOREIGN KEY ("cityId") REFERENCES "public"."cityTable"("cityId") ON DELETE cascade ON UPDATE no action;