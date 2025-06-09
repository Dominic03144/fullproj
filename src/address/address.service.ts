import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { addressTable } from "../drizzle/schema";
import type { InferModel } from "drizzle-orm";

// Infer types from schema
export type TAddressInsert = InferModel<typeof addressTable, "insert">;
export type TAddressSelect = InferModel<typeof addressTable, "select">;

// Get all address entries
export const getAddressesServices = async (): Promise<TAddressSelect[] | null> => {
  return await db.query.addressTable.findMany();
};

// Get a specific address by ID
export const getAddressByIdServices = async (
  id: number
): Promise<TAddressSelect | undefined> => {
  return await db.query.addressTable.findFirst({
    where: eq(addressTable.addressId, id),
  });
};

// Create a new address entry
export const createAddressServices = async (
  data: TAddressInsert
): Promise<string> => {
  await db.insert(addressTable).values(data).returning();
  return "Address created successfully 🏡";
};

// Update an address entry by ID
export const updateAddressServices = async (
  id: number,
  data: Partial<TAddressInsert>
): Promise<string> => {
  await db.update(addressTable).set(data).where(eq(addressTable.addressId, id));
  return "Address updated successfully ✏️";
};

// Delete an address entry by ID
export const deleteAddressServices = async (id: number): Promise<string> => {
  await db.delete(addressTable).where(eq(addressTable.addressId, id));
  return "Address deleted successfully 🗑️";
};
