
import {text, timestamp, boolean, decimal,integer, serial,pgEnum, pgTable} from "drizzle-orm/pg-core";

import {relations} from "drizzle-orm";


export const userTypeEnum = pgEnum("user_type", ["customer", "owner", "driver", "admin", "member"]);


export const statusEnum = pgEnum("status_enum", [
  "pending",
  "accepted",
  "rejected",
  "delivered",
]);
//1.STATE TABLE
export const stateTable = pgTable('stateTable',{
    stateId: serial('stateId').primaryKey(),
    stateName: text('stateName').notNull(),
    stateCode: text('stateCode').notNull().unique(),
});

//2.CITY TABLE
export const cityTable = pgTable('cityTable', {
    cityId:serial('cityId').primaryKey(),
    cityName:text('cityName').notNull(),
    stateId:integer('stateId').notNull().references(()=>stateTable.stateId, {onDelete: 'cascade'}),

});

//3.RESTAURANT TABLE
export const restaurantTable = pgTable('restaurantTable', {
    restaurantId: serial('restaurantId').primaryKey(),
    restaurantName: text('restaurantName').notNull(),
    streetAddress: text('streetAddress').notNull(),
    zipCode: text('zipCode').notNull(),
    cityId: integer('cityId').notNull().references(()=> cityTable.cityId, {onDelete: 'cascade'}),
    createdAt:timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull().$onUpdate(() => new Date()),
});
//4.MENU TABLE
export const menuItemTable = pgTable('menuItemTable',{
    menuItemId: serial('menuId').primaryKey(),
    menuName:text('menuName').notNull(),
    restaurantId: integer('restaurantId').notNull().references(()=> restaurantTable.restaurantId, {onDelete: 'cascade'}),
    categoryId: integer('categoryId').notNull().references(() => categoryTable.categoryId, {onDelete: 'cascade'}),
    description: text('description').notNull(),
    ingredients: text('ingredients').notNull(),
    price:decimal('price', {precision: 10, scale: 2}),
    active:boolean('active').default(false),
    createdAt:timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull().$onUpdate(() => new Date()),

});
//5.CATEGORY TABLE
export const categoryTable = pgTable('categoryTable',{
    categoryId: serial('categoryId').primaryKey(),
    categoryName: text('categoryName').notNull(),
});
//6.USER TABLE
export const userTable = pgTable('userTable',{
    userId: serial('userId').primaryKey(),
    userName: text('name').notNull(),
    contactPhone: text('contactPhone').notNull().unique(),
    phoneVerified: boolean('phoneVerified').default(false),
    email: text('email').notNull().unique(),
    emailVerified: boolean('emailVerified').default(false),
userType: userTypeEnum("userType").default("customer").notNull(),
    confirmationCode: text('confirmationCode'),
    password:text('password').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull().$onUpdate(() => new Date()),

});
//7.RESTAURANT OWNER TABLE
export const restaurantOwnerTable = pgTable('restaurantOwnerTable',{
    restaurantOwnerId: serial('restaurantOwnerId').primaryKey(),
    restaurantId: integer('restaurantId').notNull().references(()=> restaurantTable.restaurantId, {onDelete: 'cascade'}),
    ownerId: integer('ownerId').notNull().references(()=> userTable.userId, {onDelete: 'cascade'}),
});
//8.DRIVER TABLE
export const driverTable = pgTable('driverTable',{
    driverId: serial('driverId').primaryKey(),
    carMake:text('carMake').notNull(),
    carModel:text('carModel').notNull(),
    carYear: integer('carYear').notNull(),
    userId: integer('userId').notNull().references(()=> userTable.userId, {onDelete: 'cascade'}),
    online:boolean('online').default(false),
    delivering:boolean('delivering').default(false),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull().$onUpdate(() => new Date()),
});
//9.ADDRESS TABLE
export const addressTable = pgTable('addressTable',{
    addressId:serial('addressId').primaryKey(),
    streetAddress1:text('streetAddress').notNull(),
    streetAddress2:text('streetAddress2'),
    zipCode:text('zipCode').notNull(),
    deliveryInstructions:text('deliveryInstructions'),
    userId:integer('userId').notNull().references(()=>userTable.userId,{onDelete:'cascade'}),
    cityId:integer('cityId').notNull().references(()=> cityTable.cityId,{onDelete:'cascade'}),
    createdAt:timestamp('createdAt').defaultNow().notNull(),
    updatedAt:timestamp('updatedAt').notNull().defaultNow().$onUpdate(() => new Date()),


});
//10.ORDERS TABLE
export const ordersTable = pgTable('ordersTable',{
    ordersId:serial('ordersId').primaryKey(),
    restaurantId:integer('restaurantId').notNull().references(()=>restaurantTable.restaurantId,{onDelete:'cascade'}),
    estimatedDeliveryTime:timestamp('estimatedDeliveryTime').notNull(),
    actualDeliveryTime:timestamp('actualDeliveryTime'),
    deliveryAddressId:integer('deliveryAddressId').notNull().references(()=> addressTable.addressId,{onDelete:'cascade'}),
    userId:integer('userId').notNull().references(()=>userTable.userId,{onDelete:'cascade'}),
    driverId:integer('driverId').notNull().references(()=>driverTable.driverId),
    price:decimal('price', {precision: 10, scale: 2}),
    discount:decimal('discount',{precision: 10, scale: 2}).default('0.00'),
    finalPrice:decimal('finalPrice',{precision: 10, scale: 2}).notNull(),
    order_status: statusEnum("status").default("pending").notNull(),
    comment:text('comment'),
    createdAt:timestamp('createdAt').notNull().defaultNow(),
    updatedAt:timestamp('updatedAt').notNull().defaultNow().$onUpdate(() => new Date()),

});
//11.ORDER STATUS TABLE
export const orderStatusTable = pgTable('orderStatusTable',{
    orderStatusId:serial('orderStatusId').primaryKey(),
    orderId:integer('orderId').notNull().references(()=> ordersTable.ordersId,{onDelete:'cascade'}),
    statusCatalogId:integer('statusCatalogId').notNull().references(()=> statusCatalogTable.statusCatalogId,{onDelete:'cascade'}),
    createdAt:timestamp('createdAt').defaultNow().notNull(),
     updatedAt:timestamp('updatedAt').notNull().defaultNow().$onUpdate(() => new Date()),

});
//12.STATUS CATALOG TABLE
export const statusCatalogTable = pgTable('statusCatalogTable',{
   statusCatalogId:serial('statusCatalogId').primaryKey(),
   statusCatalogName:text('statusCatalogName').notNull(),
});

//13.COMMENT TABLE
export const commentTable = pgTable('commentTable',{
    commentId:serial('commentId').primaryKey(),
    orderId:integer('orderId').notNull().references(()=> ordersTable.ordersId,{onDelete:'cascade'}),
    userId:integer('userId').notNull().references(()=> userTable.userId,{onDelete:'cascade'}),
    commentText:text('commentText').notNull(),
    isComplaint:boolean('isComplaint').default(false),
    isPraise:boolean('isPraise').default(false),
    createdAt:timestamp('createdAt').defaultNow().notNull(),
    updatedAt:timestamp('updatedAt').defaultNow().notNull().$onUpdate(() => new Date()),
});
//14.orderMenuTable
export const orderMenuItemTable = pgTable('orderMenuItemTable',{
    orderMenuItemId: serial('orderMenuItemId').primaryKey(),
    orderId: integer('orderId').notNull().references(() => ordersTable.ordersId, { onDelete: 'cascade' }),
    menuItemId: integer('menuItemId').notNull().references(() => menuItemTable.menuItemId, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull(),
    itemPrice: decimal('itemPrice', { precision: 10, scale: 2 }).notNull(),
    price:decimal('price', { precision: 10, scale: 2 }).notNull(),
    comment: text('comment'),
})



///RELATIONS 


// 1. cityTable has many restaurantTable and addressTable
export const cityTableRelations = relations(cityTable, ({ many }) => ({
    restaurants: many(restaurantTable),
    addresses: many(addressTable),
}));


// 2. stateTable has many cityTable
export const stateTableRelations = relations(stateTable, ({ many }) => ({
    cities: many(cityTable),
}));

// 3. restaurantTable has many menuItemTable, restaurantOwnerTable, and ordersTable
export const restaurantTableRelations = relations(restaurantTable, ({ many }) => ({
    menuItems: many(menuItemTable),
    owners: many(restaurantOwnerTable),
    orders: many(ordersTable),
}));

// 4. menuItemTable belongs to restaurantTable and categoryTable
export const menuItemTableRelations = relations(menuItemTable, ({ one }) => ({
    restaurant: one(restaurantTable, {
        fields: [menuItemTable.restaurantId],
        references: [restaurantTable.restaurantId],
    }),
    category: one(categoryTable, {
        fields: [menuItemTable.categoryId],
        references: [categoryTable.categoryId],
    }),
}));

// 5. categoryTable has many menuItemTable
export const categoryTableRelations = relations(categoryTable, ({ many }) => ({
    menuItems: many(menuItemTable),
}));

// 6. userTable has many restaurantOwnerTable, addressTable, ordersTable, commentTable, and driverTable
export const userTableRelations = relations(userTable, ({ many }) => ({
    restaurantOwnerships: many(restaurantOwnerTable),
    addresses: many(addressTable),
    orders: many(ordersTable),
    comments: many(commentTable),
    drivers: many(driverTable),
}));

// 7. restaurantOwnerTable belongs to restaurantTable and userTable
export const restaurantOwnerTableRelations = relations(restaurantOwnerTable, ({ one }) => ({
    restaurant: one(restaurantTable, {
        fields: [restaurantOwnerTable.restaurantId],
        references: [restaurantTable.restaurantId],
    }),
    owner: one(userTable, {
        fields: [restaurantOwnerTable.ownerId],
        references: [userTable.userId],
    }),
}));

// 8. driverTable belongs to userTable and has many ordersTable
export const driverTableRelations = relations(driverTable, ({ one, many }) => ({
    user: one(userTable, {
        fields: [driverTable.userId],
        references: [userTable.userId],
    }),
    orders: many(ordersTable),
}));

// 9. addressTable belongs to userTable and cityTable
export const addressTableRelations = relations(addressTable, ({ one }) => ({
    user: one(userTable, {
        fields: [addressTable.userId],
        references: [userTable.userId],
    }),
    city: one(cityTable, {
        fields: [addressTable.cityId],
        references: [cityTable.cityId],
    }),
}));

// 10. ordersTable belongs to userTable, driverTable, restaurantTable, and has many orderMenuItemTable, orderStatusTable, commentTable
export const ordersTableRelations = relations(ordersTable, ({ one, many }) => ({
    user: one(userTable, {
        fields: [ordersTable.userId],
        references: [userTable.userId],
    }),
    driver: one(driverTable, {
        fields: [ordersTable.driverId],
        references: [driverTable.driverId],
    }),
    restaurant: one(restaurantTable, {
        fields: [ordersTable.restaurantId],
        references: [restaurantTable.restaurantId],
    }),
    orderMenuItems: many(orderMenuItemTable),
    orderStatuses: many(orderStatusTable),
    comments: many(commentTable),
}));

// 11. orderStatusTable belongs to ordersTable and statusCatalogTable
export const orderStatusTableRelations = relations(orderStatusTable, ({ one }) => ({
    order: one(ordersTable, {
        fields: [orderStatusTable.orderId],
        references: [ordersTable.ordersId],
    }),
    statusCatalog: one(statusCatalogTable, {
        fields: [orderStatusTable.statusCatalogId],
        references: [statusCatalogTable.statusCatalogId],
    }),
}));

// 12. statusCatalogTable has many orderStatusTable
export const statusCatalogTableRelations = relations(statusCatalogTable, ({ many }) => ({
    orderStatuses: many(orderStatusTable),
}));

// 13. commentTable belongs to ordersTable and userTable
export const commentTableRelations = relations(commentTable, ({ one }) => ({
    order: one(ordersTable, {
        fields: [commentTable.orderId],
        references: [ordersTable.ordersId],
    }),
    user: one(userTable, {
        fields: [commentTable.userId],
        references: [userTable.userId],
    }),
}));

// 14. orderMenuItemTable belongs to ordersTable and menuItemTable
export const orderMenuItemTableRelations = relations(orderMenuItemTable, ({ one }) => ({
    order: one(ordersTable, {
        fields: [orderMenuItemTable.orderId],
        references: [ordersTable.ordersId],
    }),
    menuItem: one(menuItemTable, {
        fields: [orderMenuItemTable.menuItemId],
        references: [menuItemTable.menuItemId],
    }),
}));

//inferTypes

export type TCityInsert = typeof cityTable.$inferInsert;
export type TCitySelect = typeof cityTable.$inferSelect;

export type TStateInsert = typeof stateTable.$inferInsert;
export type TStateSelect = typeof stateTable.$inferSelect;

export type TRestaurantInsert = typeof restaurantTable.$inferInsert;
export type TRestaurantSelect = typeof restaurantTable.$inferSelect;

export type TMenuItemInsert = typeof menuItemTable.$inferInsert;
export type TMenuItemSelect = typeof menuItemTable.$inferSelect;

export type TCategoryInsert = typeof categoryTable.$inferInsert;
export type TCategorySelect = typeof categoryTable.$inferSelect;

export type TUserInsert = typeof userTable.$inferInsert;
export type TUserSelect = typeof userTable.$inferSelect;

export type TRestaurantOwnerInsert = typeof restaurantOwnerTable.$inferInsert;
export type TRestaurantOwnerSelect = typeof restaurantOwnerTable.$inferSelect;

export type TDriverInsert = typeof driverTable.$inferInsert;
export type TDriverSelect = typeof driverTable.$inferSelect;

export type TAddressInsert = typeof addressTable.$inferInsert;
export type TAddressSelect = typeof addressTable.$inferSelect;

export type TOrderInsert = typeof ordersTable.$inferInsert;
export type TOrderSelect = typeof ordersTable.$inferSelect;

export type TOrderStatusInsert = typeof orderStatusTable.$inferInsert;
export type TOrderStatusSelect = typeof orderStatusTable.$inferSelect;

export type TStatusCatalogInsert = typeof statusCatalogTable.$inferInsert;
export type TStatusCatalogSelect = typeof statusCatalogTable.$inferSelect;

export type TCommentInsert = typeof commentTable.$inferInsert;
export type TCommentSelect = typeof commentTable.$inferSelect;

export type TOrderMenuItemInsert = typeof orderMenuItemTable.$inferInsert;
export type TOrderMenuItemSelect = typeof orderMenuItemTable.$inferSelect;

