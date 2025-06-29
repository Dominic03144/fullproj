// drizzle/seed.ts
import { db } from "../drizzle/db";
import {
  stateTable,
  cityTable,
  userTable,
  restaurantTable,
  categoryTable,
  menuItemTable,
  addressTable,
  driverTable,
  ordersTable,
  orderMenuItemTable,
} from "./schema";
import bcrypt from "bcrypt";

async function seed() {
  console.log("🌱 Seeding started...");

  // 1. States
  const [state] = await db.insert(stateTable).values({
    stateName: "Nyanza",
    stateCode: "NYZ",
  }).returning();

  // 2. Cities
  const [city] = await db.insert(cityTable).values({
    cityName: "Kisumu",
    stateId: state.stateId,
  }).returning();

  // 3. Users
  const hashedPassword = await bcrypt.hash("password123", 10);
  const [user] = await db.insert(userTable).values({
    userName: "John Doe",
    email: "john@example.com",
    contactPhone: "0712345678",
    password: hashedPassword,
    userType: "driver",
  }).returning();

  // 4. Driver
  const [driver] = await db.insert(driverTable).values({
    userId: user.userId,
    carMake: "Toyota",
    carModel: "Axio",
    carYear: 2020,
  }).returning();

  // 5. Restaurant
  const [restaurant] = await db.insert(restaurantTable).values({
    restaurantName: "Taste of Kenya",
    streetAddress: "123 Main St",
    zipCode: "40100",
    cityId: city.cityId,
  }).returning();

  // 6. Category
  const [category] = await db.insert(categoryTable).values({
    categoryName: "Main Dish",
  }).returning();

  // 7. Menu Item
  const [menuItem] = await db.insert(menuItemTable).values({
    menuName: "Ugali Nyama",
    description: "Cornmeal and beef stew",
    ingredients: "maize flour, beef, tomato, onion",
    price: "450.00",
    active: true,
    restaurantId: restaurant.restaurantId,
    categoryId: category.categoryId,
  }).returning();

  // 8. Address
  const [address] = await db.insert(addressTable).values({
    streetAddress: "456 Avenue Ln",
    cityId: city.cityId,
    zipCode: "40100",
  }).returning();

  // 9. Order
  const [order] = await db.insert(ordersTable).values({
    restaurantId: restaurant.restaurantId,
    estimatedDeliveryTime: new Date(),
    deliveryAddressId: address.addressId,
    userId: user.userId,
    driverId: driver.driverId,
    price: "450.00",
    discount: "0.00",
    finalPrice: "450.00",
    order_status: "pending",
    comment: "Please deliver fast!",
  }).returning();

  // 10. Order Menu Item
  await db.insert(orderMenuItemTable).values({
    orderId: order.ordersId,
    menuItemId: menuItem.menuItemId,
    quantity: 1,
    itemPrice: "450.00",
    price: "450.00",
    comment: "Extra spicy",
  });

  console.log("✅ Seeding completed.");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
