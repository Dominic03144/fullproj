import {
  text,
  timestamp,
  boolean,
  decimal,
  integer,
  serial,
  pgEnum,
  pgTable,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const userTypeEnum = pgEnum("user_type", ["customer", "owner", "driver", "admin", "member"]);
export const statusEnum = pgEnum("status_enum", ["pending", "accepted", "rejected", "delivered"]);

// State Table
export const stateTable = pgTable("stateTable", {
  stateId: serial("stateId").primaryKey(),
  stateName: text("stateName").notNull(),
  stateCode: text("stateCode").notNull().unique(),
});

// City Table
export const cityTable = pgTable("cityTable", {
  cityId: serial("cityId").primaryKey(),
  cityName: text("cityName").notNull(),
  stateId: integer("stateId").notNull().references(() => stateTable.stateId, { onDelete: "cascade" }),
});

// Category Table
export const categoryTable = pgTable("categoryTable", {
  categoryId: serial("categoryId").primaryKey(),
  categoryName: text("categoryName").notNull(),
});

// User Table
export const userTable = pgTable("userTable", {
  userId: serial("userId").primaryKey(),
  userName: text("userName").notNull(),
  contactPhone: text("contactPhone").notNull().unique(),
  phoneVerified: boolean("phoneVerified").default(false),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").default(false),
  userType: userTypeEnum("userType").default("customer").notNull(),
  confirmationCode: text("confirmationCode"),
  password: text("password").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull().$onUpdate(() => new Date()),
});

// Restaurant Table
export const restaurantTable = pgTable("restaurantTable", {
  restaurantId: serial("restaurantId").primaryKey(),
  restaurantName: text("restaurantName").notNull(),
  streetAddress: text("streetAddress").notNull(),
  zipCode: text("zipCode").notNull(),
  cityId: integer("cityId").notNull().references(() => cityTable.cityId, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull().$onUpdate(() => new Date()),
});

// Menu Item Table
export const menuItemTable = pgTable("menuItemTable", {
  menuItemId: serial("menuItemId").primaryKey(),
  menuName: text("menuName").notNull(),
  restaurantId: integer("restaurantId").notNull().references(() => restaurantTable.restaurantId, { onDelete: "cascade" }),
  categoryId: integer("categoryId").notNull().references(() => categoryTable.categoryId, { onDelete: "cascade" }),
  description: text("description").notNull(),
  ingredients: text("ingredients").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  active: boolean("active").default(false),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull().$onUpdate(() => new Date()),
});

// Address Table
export const addressTable = pgTable("addressTable", {
  addressId: serial("addressId").primaryKey(),
  streetAddress: text("streetAddress").notNull(),
  cityId: integer("cityId").notNull().references(() => cityTable.cityId, { onDelete: "cascade" }),
  zipCode: text("zipCode").notNull(),
});

// Driver Table
export const driverTable = pgTable("driverTable", {
  driverId: serial("driverId").primaryKey(),
  userId: integer("userId").notNull().references(() => userTable.userId, { onDelete: "cascade" }),
  carMake: text("carMake").notNull(),
  carModel: text("carModel").notNull(),
  carYear: integer("carYear").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull().$onUpdate(() => new Date()),
});

// Orders Table
export const ordersTable = pgTable("ordersTable", {
  ordersId: serial("ordersId").primaryKey(),
  restaurantId: integer("restaurantId").notNull().references(() => restaurantTable.restaurantId, { onDelete: "cascade" }),
  estimatedDeliveryTime: timestamp("estimatedDeliveryTime", { mode: "date" }).notNull(),
  actualDeliveryTime: timestamp("actualDeliveryTime", { mode: "date" }),
  deliveryAddressId: integer("deliveryAddressId").notNull().references(() => addressTable.addressId, { onDelete: "cascade" }),
  userId: integer("userId").notNull().references(() => userTable.userId, { onDelete: "cascade" }),
  driverId: integer("driverId").notNull().references(() => driverTable.driverId),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 10, scale: 2 }).default("0.00"),
  finalPrice: decimal("finalPrice", { precision: 10, scale: 2 }).notNull(),
  order_status: statusEnum("status").default("pending").notNull(),
  comment: text("comment"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow().$onUpdate(() => new Date()),
});

// Order Menu Item Table
export const orderMenuItemTable = pgTable("orderMenuItemTable", {
  orderMenuItemId: serial("orderMenuItemId").primaryKey(),
  orderId: integer("orderId").notNull().references(() => ordersTable.ordersId, { onDelete: "cascade" }),
  menuItemId: integer("menuItemId").notNull().references(() => menuItemTable.menuItemId, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  itemPrice: decimal("itemPrice", { precision: 10, scale: 2 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  comment: text("comment"),
});

// Comments Table (new)
export const commentsTable = pgTable("commentsTable", {
  commentId: serial("commentId").primaryKey(),
  userId: integer("userId").notNull().references(() => userTable.userId, { onDelete: "cascade" }),
  restaurantId: integer("restaurantId").references(() => restaurantTable.restaurantId, { onDelete: "cascade" }),
  commentText: text("commentText").notNull(),
  commentType: text("commentType").notNull(), // e.g., "praise", "complaint"
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull().$onUpdate(() => new Date()),
});

// User Types
export type TUserInsert = typeof userTable.$inferInsert;
export type TUserSelect = typeof userTable.$inferSelect;

// Order Types
export type TOrderInsert = typeof ordersTable.$inferInsert;
export type TOrderSelect = typeof ordersTable.$inferSelect;

// Order Menu Item Types
export type TOrderMenuItemInsert = typeof orderMenuItemTable.$inferInsert;
export type TOrderMenuItemSelect = typeof orderMenuItemTable.$inferSelect;

// Restaurant Types
export type TRestaurantInsert = typeof restaurantTable.$inferInsert;
export type TRestaurantSelect = typeof restaurantTable.$inferSelect;

// Driver Types
export type TDriverInsert = typeof driverTable.$inferInsert;
export type TDriverSelect = typeof driverTable.$inferSelect;

// Address Types
export type TAddressInsert = typeof addressTable.$inferInsert;
export type TAddressSelect = typeof addressTable.$inferSelect;

// City Types
export type TCityInsert = typeof cityTable.$inferInsert;
export type TCitySelect = typeof cityTable.$inferSelect;

// State Types
export type TStateInsert = typeof stateTable.$inferInsert;
export type TStateSelect = typeof stateTable.$inferSelect;

// Category Types
export type TCategoryInsert = typeof categoryTable.$inferInsert;
export type TCategorySelect = typeof categoryTable.$inferSelect;

// Menu Item Types
export type TMenuItemInsert = typeof menuItemTable.$inferInsert;
export type TMenuItemSelect = typeof menuItemTable.$inferSelect;

// Comments Types
export type TCommentInsert = typeof commentsTable.$inferInsert;
export type TCommentSelect = typeof commentsTable.$inferSelect;
