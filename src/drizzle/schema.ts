import {  pgTable, 
  serial, 
  varchar, 
  text, 
  boolean, 
  timestamp, 
  integer, 
  decimal,
 } from 'drizzle-orm/pg-core';
 ;
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  contactPhone: varchar('contact_phone', { length: 20 }),
  phoneVerified: boolean('phone_verified').default(false),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').default(false),
  confirmationCode: varchar('confirmation_code', { length: 100 }),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// State table
export const state = pgTable('state', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  code: varchar('code', { length: 10 }).notNull(),
});

// City table
export const city = pgTable('city', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  stateId: integer('state_id').references(() => state.id).notNull(),
});

// Address table
export const address = pgTable('address', {
  id: serial('id').primaryKey(),
  streetAddress1: varchar('street_address_1', { length: 255 }).notNull(),
  streetAddress2: varchar('street_address_2', { length: 255 }),
  zipCode: varchar('zip_code', { length: 20 }).notNull(),
  deliveryInstructions: text('delivery_instructions'),
  userId: integer('user_id').references(() => users.id).notNull(),
  cityId: integer('city_id').references(() => city.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Restaurant table
export const restaurant = pgTable('restaurant', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  streetAddress: varchar('street_address', { length: 255 }).notNull(),
  zipCode: varchar('zip_code', { length: 20 }).notNull(),
  cityId: integer('city_id').references(() => city.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Restaurant Owner table
export const restaurantOwner = pgTable('restaurant_owner', {
  id: serial('id').primaryKey(),
  restaurantId: integer('restaurant_id').references(() => restaurant.id).notNull(),
  ownerId: integer('owner_id').references(() => users.id).notNull(),
});

// Driver table
export const driver = pgTable('driver', {
  id: serial('id').primaryKey(),
  carMake: varchar('car_make', { length: 50 }),
  carModel: varchar('car_model', { length: 50 }),
  carYear: integer('car_year'),
  userId: integer('user_id').references(() => users.id).notNull(),
  online: boolean('online').default(false),
  delivering: boolean('delivering').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Category table
export const category = pgTable('category', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
});

// Menu Item table
export const menuItem = pgTable('menu_item', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  restaurantId: integer('restaurant_id').references(() => restaurant.id).notNull(),
  categoryId: integer('category_id').references(() => category.id).notNull(),
  description: text('description'),
  ingredients: text('ingredients'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Status Catalog table
export const statusCatalog = pgTable('status_catalog', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
});

// Orders table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  restaurantId: integer('restaurant_id').references(() => restaurant.id).notNull(),
  estimatedDeliveryTime: timestamp('estimated_delivery_time'),
  actualDeliveryTime: timestamp('actual_delivery_time'),
  deliveryAddressId: integer('delivery_address_id').references(() => address.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  driverId: integer('driver_id').references(() => driver.id),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  discount: decimal('discount', { precision: 10, scale: 2 }).default('0'),
  finalPrice: decimal('final_price', { precision: 10, scale: 2 }).notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});


// Order Menu Item table (junction table)
export const orderMenuItem = pgTable('order_menu_item', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => orders.id).notNull(),
  menuItemId: integer('menu_item_id').references(() => menuItem.id).notNull(),
  quantity: integer('quantity').notNull(),
  itemPrice: decimal('item_price', { precision: 10, scale: 2 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  comment: text('comment'),
});

// Order Status table
export const orderStatus = pgTable('order_status', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => orders.id).notNull(),
  statusCatalogId: integer('status_catalog_id').references(() => statusCatalog.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Comment table
export const comment = pgTable('comment', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => orders.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  commentText: text('comment_text').notNull(),
  isComplaint: boolean('is_complaint').default(false),
  isPraise: boolean('is_praise').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// RELATIONS

// Users relations
export const usersRelations = relations(users, ({ many, one }) => ({
  addresses: many(address),
  orders: many(orders),
  comments: many(comment),
  driverProfile: one(driver, {
    fields: [users.id],
    references: [driver.userId],
  }),
  restaurantOwnerships: many(restaurantOwner),
}));

// State relations
export const stateRelations = relations(state, ({ many }) => ({
  cities: many(city),
}));

// City relations
export const cityRelations = relations(city, ({ one, many }) => ({
  state: one(state, {
    fields: [city.stateId],
    references: [state.id],
  }),
  addresses: many(address),
  restaurants: many(restaurant),
}));

// Address relations
export const addressRelations = relations(address, ({ one, many }) => ({
  user: one(users, {
    fields: [address.userId],
    references: [users.id],
  }),
  city: one(city, {
    fields: [address.cityId],
    references: [city.id],
  }),
  orders: many(orders),
}));

// Restaurant relations
export const restaurantRelations = relations(restaurant, ({ one, many }) => ({
  city: one(city, {
    fields: [restaurant.cityId],
    references: [city.id],
  }),
  menuItems: many(menuItem),
  orders: many(orders),
  owners: many(restaurantOwner),
}));

// Restaurant Owner relations
export const restaurantOwnerRelations = relations(restaurantOwner, ({ one }) => ({
  restaurant: one(restaurant, {
    fields: [restaurantOwner.restaurantId],
    references: [restaurant.id],
  }),
  owner: one(users, {
    fields: [restaurantOwner.ownerId],
    references: [users.id],
  }),
}));

// Driver relations
export const driverRelations = relations(driver, ({ one, many }) => ({
  user: one(users, {
    fields: [driver.userId],
    references: [users.id],
  }),
  orders: many(orders),
}));

// Category relations
export const categoryRelations = relations(category, ({ many }) => ({
  menuItems: many(menuItem),
}));

// Menu Item relations
export const menuItemRelations = relations(menuItem, ({ one, many }) => ({
  restaurant: one(restaurant, {
    fields: [menuItem.restaurantId],
    references: [restaurant.id],
  }),
  category: one(category, {
    fields: [menuItem.categoryId],
    references: [category.id],
  }),
  orderMenuItems: many(orderMenuItem),
}));

// Status Catalog relations
export const statusCatalogRelations = relations(statusCatalog, ({ many }) => ({
  orderStatuses: many(orderStatus),
}));

// Orders relations
export const ordersRelations = relations(orders, ({ one, many }) => ({
  restaurant: one(restaurant, {
    fields: [orders.restaurantId],
    references: [restaurant.id],
  }),
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  driver: one(driver, {
    fields: [orders.driverId],
    references: [driver.id],
  }),
  deliveryAddress: one(address, {
    fields: [orders.deliveryAddressId],
    references: [address.id],
  }),
  orderMenuItems: many(orderMenuItem),
  orderStatuses: many(orderStatus),
  comments: many(comment),
}));

// Order Menu Item relations
export const orderMenuItemRelations = relations(orderMenuItem, ({ one }) => ({
  order: one(orders, {
    fields: [orderMenuItem.orderId],
    references: [orders.id],
  }),
  menuItem: one(menuItem, {
    fields: [orderMenuItem.menuItemId],
    references: [menuItem.id],
  }),
}));

// Order Status relations
export const orderStatusRelations = relations(orderStatus, ({ one }) => ({
  order: one(orders, {
    fields: [orderStatus.orderId],
    references: [orders.id],
  }),
  statusCatalog: one(statusCatalog, {
    fields: [orderStatus.statusCatalogId],
    references: [statusCatalog.id],
  }),
}));

// Comment relations
export const commentRelations = relations(comment, ({ one }) => ({
  order: one(orders, {
    fields: [comment.orderId],
    references: [orders.id],
  }),
  user: one(users, {
    fields: [comment.userId],
    references: [users.id],
  }),
}));

