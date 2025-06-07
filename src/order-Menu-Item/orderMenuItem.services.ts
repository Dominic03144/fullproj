import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TOrderMenuItemSelect, TOrderMenuItemInsert,orderMenuItemTable } from "../drizzle/schema";
 
 
//CRUD Operations for Order Menu Item entity
 
 
//Get all Order Menu Items
export const getAllExistingOrderMenuItems = async():Promise<TOrderMenuItemSelect[] | null> => {
     return await  db.query.orderMenuItemTable.findMany({});
}
 
//Get order Menu Item by ID
export const getExistingOrderMenuItemById = async(existingOrderMenuItemId: number):Promise<TOrderMenuItemSelect | undefined>=> {
      return await db.query.orderMenuItemTable.findFirst({
        where: eq(orderMenuItemTable.orderMenuItemId,existingOrderMenuItemId)
      })
}
 
// Create a New Order Menu Item
export const createNewOrderMenuItem = async(order:TOrderMenuItemInsert):Promise<string> => {
       await db.insert(orderMenuItemTable).values(order).returning();
        return "Order Menu Item Created Successfully 😎"
}
 
// Update an existing Order Menu Item 
export const updateExistingOrderMenuItem = async(existingOrderMenuItemId: number, orderMenuItem:TOrderMenuItemInsert):Promise<string> => {
    await db.update(orderMenuItemTable).set(orderMenuItem).where(eq(orderMenuItemTable.orderMenuItemId,existingOrderMenuItemId));
    return "Order Menu Item Details  Updated Succeffully 😎";
}

 //delete an existing Order Menu Item
export const deleteExistingOrderMenuItem = async(existingOrderMenuItemId: number):Promise<string> => {
   await db.delete(orderMenuItemTable).where(eq(orderMenuItemTable.orderMenuItemId,existingOrderMenuItemId));
   return "Selected Order Menu Item  Deleted Sucessfully";
}