import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { cityTable } from "../drizzle/schema";
import type { InferModel } from "drizzle-orm";

export type TCityInsert = InferModel<typeof cityTable, "insert">;
export type TCitySelect = InferModel<typeof cityTable, "select">;

export const getCitiesService = async (): Promise<TCitySelect[]> => {
  return await db.query.cityTable.findMany();
};

export const getCityByIdService = async (id: number): Promise<TCitySelect | undefined> => {
  return await db.query.cityTable.findFirst({
    where: eq(cityTable.cityId, id),
  });
};

export const createCityService = async (
  data: TCityInsert
): Promise<string> => {
  await db.insert(cityTable).values(data).returning();
  return "City created successfully 🏙️";
};

export const updateCityService = async (
  id: number,
  data: Partial<TCityInsert>
): Promise<string> => {
  await db.update(cityTable).set(data).where(eq(cityTable.cityId, id));
  return "City updated successfully 🛠️";
};

export const deleteCityService = async (
  id: number
): Promise<string> => {
  await db.delete(cityTable).where(eq(cityTable.cityId, id));
  return "City deleted successfully 🗑️";
};
