// drizzle/seed/address.seed.ts
import { db } from "../drizzle/db"; // Adjust path based on your project
import { addressTable } from "../drizzle/schema";
import { cityTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

async function seedAddresses() {
  const existingCities = await db.select().from(cityTable).limit(3);

  if (existingCities.length === 0) {
    console.error("❌ No cities found. Please seed cityTable first.");
    process.exit(1);
  }

  const [city1, city2, city3] = existingCities;

  await db.insert(addressTable).values([
    {
      streetAddress: "123 Riverside Drive",
      cityId: city1.cityId,
      zipCode: "00100",
    },
    {
      streetAddress: "456 Mombasa Road",
      cityId: city2.cityId,
      zipCode: "00200",
    },
    {
      streetAddress: "789 Thika Superhighway",
      cityId: city3.cityId,
      zipCode: "00300",
    },
  ]);

  console.log("✅ Seeded addressTable with 3 addresses");
  process.exit(0);
}

seedAddresses().catch((err) => {
  console.error("❌ Failed to seed addressTable:", err);
  process.exit(1);
});
