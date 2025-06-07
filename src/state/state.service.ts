import { eq } from "drizzle-orm";

import {db} from "../drizzle/db";

import { stateTable } from "../drizzle/schema";
import type { InferModel } from "drizzle-orm";

export type TStateInsert = InferModel<typeof stateTable, "insert">;
export type TStateSelect = InferModel<typeof stateTable, "select">;

export const getStatesService = async (): Promise<TStateSelect[]> => {
  return await db.query.stateTable.findMany();
};

export const getStateByIdService = async (id: number): Promise<TStateSelect | undefined> => {
  return await db.query.stateTable.findFirst({
    where: eq(stateTable.stateId, id),
  });
};

export const createStateService = async (data: TStateInsert): Promise<string> => {
  await db.insert(stateTable).values(data).returning();
  return "State created successfully 🗺️";
};

export const updateStateService = async (
  id: number,
  data: Partial<TStateInsert>
): Promise<string> => {
  await db.update(stateTable).set(data).where(eq(stateTable.stateId, id));
  return "State updated successfully ✏️";
};

export const deleteStateService = async (id: number): Promise<string> => {
  await db.delete(stateTable).where(eq(stateTable.stateId, id));
  return "State deleted successfully 🗑️";
};
