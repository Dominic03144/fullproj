import { db } from "./db"; // or "../drizzle/db" if needed
import { menuItemTable, categoryTable, restaurantTable } from "./schema"; // adjust import path if needed

async function seedMenuItems() {
  try {
    const [restaurant] = await db.select().from(restaurantTable).limit(1);
    const categories = await db.select().from(categoryTable);

    if (!restaurant) throw new Error("No restaurant found in database.");
    if (categories.length < 3) throw new Error("Not enough categories found.");

    const menuItems = [
      {
        menuName: "Spicy Chicken Wings",
        restaurantId: restaurant.restaurantId,
        categoryId: categories[0].categoryId,
        description: "Hot and crispy chicken wings tossed in a spicy sauce.",
        ingredients: "Chicken, chili sauce, garlic, pepper",
        price: "950.00",
        active: true,
      },
      {
        menuName: "Grilled Beef Burger",
        restaurantId: restaurant.restaurantId,
        categoryId: categories[0].categoryId,
        description: "Juicy grilled beef burger served with fries.",
        ingredients: "Beef patty, lettuce, tomato, cheese, bun",
        price: "1150.00",
        active: true,
      },
      {
        menuName: "Vegetarian Pasta",
        restaurantId: restaurant.restaurantId,
        categoryId: categories[1].categoryId,
        description: "Creamy pasta loaded with fresh vegetables.",
        ingredients: "Pasta, zucchini, mushrooms, cream, parmesan",
        price: "870.00",
        active: true,
      },
      {
        menuName: "Tilapia Fillet",
        restaurantId: restaurant.restaurantId,
        categoryId: categories[2].categoryId,
        description: "Pan-fried tilapia fillet with lemon butter sauce.",
        ingredients: "Tilapia, lemon, butter, garlic, parsley",
        price: "1300.00",
        active: true,
      },
    ];

    await db.insert(menuItemTable).values(menuItems);
    console.log("✅ Menu items seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding menu items:", error);
  }
}

seedMenuItems();
