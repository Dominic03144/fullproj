// src/db/seeds/menu.seed.ts

import { db } from "./db";
import { menuItemTable } from "./schema";
import type { TMenuItemInsert } from "./schema";

const seedMenuItems = async () => {
  const meals: TMenuItemInsert[] = [
    {
      menuName: "Spicy Chicken Wings",
      restaurantId: 1,
      categoryId: 1,
      description: "Hot and crispy chicken wings tossed in a spicy sauce.",
      ingredients: "Chicken, chili sauce, garlic, pepper",
      price: "950.00",
      active: true,
    },
    {
      menuName: "Grilled Beef Burger",
      restaurantId: 1,
      categoryId: 1,
      description: "Juicy grilled beef burger served with fries.",
      ingredients: "Beef patty, lettuce, tomato, cheese, bun",
      price: "1150.00",
      active: true,
    },
    {
      menuName: "Vegetarian Pasta",
      restaurantId: 1,
      categoryId: 2,
      description: "Creamy pasta loaded with fresh vegetables.",
      ingredients: "Pasta, zucchini, mushrooms, cream, parmesan",
      price: "870.00",
      active: true,
    },
    {
      menuName: "Tilapia Fillet",
      restaurantId: 1,
      categoryId: 3,
      description: "Pan-fried tilapia fillet with lemon butter sauce.",
      ingredients: "Tilapia, lemon, butter, garlic, parsley",
      price: "1300.00",
      active: true,
    },
  ];

  try {
    await db.insert(menuItemTable).values(meals);
    console.log("✅ Menu items seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding menu items:", error);
  }
};

seedMenuItems();
