import {db} from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TDriverInsert, TDriverSelect,driverTable } from "../drizzle/schema";
// GET ALL DRIVERS
export const getDriversServices = async (): Promise<TDriverSelect[]| null> => {
  return await db.select().from(driverTable);
};

// GET DRIVER BY ID
export const getDriverByIdServices = async (driverId: number): Promise<TDriverSelect | undefined> => {
  return await db.query.driverTable.findFirst({where:eq(driverTable.driverId, driverId)});
  };

 
// CREATE DRIVER
export const createDriverServices = async (data: TDriverInsert): Promise<string> => {
   await db.insert(driverTable).values(data).returning();
  return "Driver created  successfully"
  
};

// UPDATE DRIVER
export const updateDriverServices = async (driverId: number, data: Partial<TDriverInsert>): Promise<string> => {
  await db.update(driverTable)
    .set(data)
    .where(eq(driverTable.driverId, driverId))
    .returning();
  return "Driver updated successfully";
};

// DELETE DRIVER
export const deleteDriverServices = async (driverId: number): Promise<string> => {
 await db.delete(driverTable).where(eq(driverTable.driverId, driverId));
  return  " Driver deleted successffully "
};