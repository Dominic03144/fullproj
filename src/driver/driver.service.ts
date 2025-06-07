import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";
import { TDriverInsert, TDriverSelect, driverTable } from "../drizzle/schema";


//CRUD Operations for Driver entity



//Get all drivers
export const getDriversServices = async():Promise<TDriverSelect[] | null> => {
    return await db.query.driverTable.findMany({});
}

//Get driver by ID
export const getDriverByIdServices = async(driverId: number):Promise<TDriverSelect | undefined> => {
     return await db.query.driverTable.findFirst({
        where: eq(driverTable.driverId, driverId)
    })
}

// Create a new driver
export const createDriverServices = async(driver: TDriverInsert):Promise<string> => {
    await db.insert(driverTable).values(driver).returning();
    return "Driver created successfully 🎉";
}

// Update an existing driver
export const updateDriverServices = async(driverId: number, driver: Partial<TDriverInsert>):Promise<string> => {
    await db.update(driverTable).set(driver).where(eq(driverTable.driverId, driverId));
    return "Driver updated successfully 😎";
}


// Delete a driver

export const deleteDriverServices = async(driverId: number):Promise<string> => {
  await db.delete(driverTable).where(eq(driverTable.driverId, driverId));
  return "Driver deleted successfully 🎉"
}
