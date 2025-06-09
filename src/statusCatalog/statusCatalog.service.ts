// src/services/statusCatalog.service.ts
import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";
import { statusCatalogTable } from "../drizzle/schema";
import type { InferModel } from "drizzle-orm";

// Infer types from schema
export type TStatusCatalogInsert = InferModel<typeof statusCatalogTable, "insert">;
export type TStatusCatalogSelect = InferModel<typeof statusCatalogTable, "select">;

// Get all status catalog items
export const getStatusCatalogsServices = async (): Promise<TStatusCatalogSelect[] | null> => {
  return await db.query.statusCatalogTable.findMany();
};

// Get a specific status catalog by ID
export const getStatusCatalogByIdServices = async (id: number): Promise<TStatusCatalogSelect | undefined> => {
  return await db.query.statusCatalogTable.findFirst({
    where: eq(statusCatalogTable.statusCatalogId, id),
  });
};

// Create a new status catalog entry
export const createStatusCatalogServices = async (
  data: TStatusCatalogInsert
): Promise<string> => {
  await db.insert(statusCatalogTable).values(data).returning();
  return "Status catalog entry created successfully 🎉";
};

// Update a status catalog entry by ID
export const updateStatusCatalogServices = async (
  id: number,
  data: Partial<TStatusCatalogInsert>
): Promise<string> => {
  await db
    .update(statusCatalogTable)
    .set(data)
    .where(eq(statusCatalogTable.statusCatalogId, id));
  return "Status catalog updated successfully 😎";
};

// Delete a status catalog entry by ID
export const deleteStatusCatalogServices = async (
  id: number
): Promise<string> => {
  await db
    .delete(statusCatalogTable)
    .where(eq(statusCatalogTable.statusCatalogId, id));
  return "Status catalog deleted successfully 🎉";
};
