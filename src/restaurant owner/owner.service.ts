import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { TRestaurantOwnerInsert, TRestaurantOwnerSelect, restaurantOwnerTableRelations, restaurantOwnerTable } from "../drizzle/schema"; 


// CRUD Operations for Owner entity


export const getOwnersServices = async(): Promise<TRestaurantOwnerSelect[] | null> => {
    return await db.query.restaurantOwnerTable.findMany({});
}


export const getOwnerByIdServices = async(ownerId: number): Promise<TRestaurantOwnerSelect | undefined> => {
    return await db.query.restaurantOwnerTable.findFirst({
        where: eq(restaurantOwnerTable.ownerId, ownerId) 
    })
}


export const createOwnerServices = async(owner: TRestaurantOwnerInsert): Promise<string> => {
    await db.insert(restaurantOwnerTable).values(owner).returning();
    return "Owner created successfully 🎉";
}


export const updateOwnerServices = async(ownerId: number, owner: Partial<TRestaurantOwnerInsert>): Promise<string> => {
    await db.update(restaurantOwnerTable).set(owner).where(eq(restaurantOwnerTable.ownerId, ownerId));
    return "Owner updated successfully 😎";
}


export const deleteOwnerServices = async(ownerId: number): Promise<string> => {
    await db.delete(restaurantOwnerTable).where(eq(restaurantOwnerTable.ownerId, ownerId));
    return "Owner deleted successfully 🎉"
}