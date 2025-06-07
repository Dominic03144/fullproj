import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { restaurantTable } from "../drizzle/schema";
import type { InferModel } from "drizzle-orm";

export type TRestaurantInsert = InferModel<typeof restaurantTable, "insert">;
export type TRestaurantSelect = InferModel<typeof restaurantTable, "select">;

export const getRestaurantsService = async (): Promise<TRestaurantSelect[]> => {
  return await db.query.restaurantTable.findMany();
};

export const getRestaurantByIdService = async (id: number): Promise<TRestaurantSelect | undefined> => {
  return await db.query.restaurantTable.findFirst({
    where: eq(restaurantTable.restaurantId, id),
  });
};

export const createRestaurantService = async (
  data: TRestaurantInsert
): Promise<string> => {
  await db.insert(restaurantTable).values(data).returning();
  return "Restaurant created successfully 🍽️";
};

export const updateRestaurantService = async (
  id: number,
  data: Partial<TRestaurantInsert>
): Promise<string> => {
  await db.update(restaurantTable).set(data).where(eq(restaurantTable.restaurantId, id));
  return "Restaurant updated successfully 🛠️";
};

export const deleteRestaurantService = async (
  id: number
): Promise<string> => {
  await db.delete(restaurantTable).where(eq(restaurantTable.restaurantId, id));
  return "Restaurant deleted successfully 🗑️";
};
