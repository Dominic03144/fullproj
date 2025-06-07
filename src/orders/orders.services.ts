import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TOrderSelect,TOrderInsert,ordersTable } from "../drizzle/schema";
 
 
//CRUD Operations for Orders entity
 
 
//Get all Addresses
export const getExistingOrders = async():Promise<TOrderSelect[] | null> => {
     return await  db.query.ordersTable.findMany({});
}
 
//Get order by ID
export const getExistingOrderById = async(existingOrderId: number):Promise<TOrderSelect | undefined>=> {
      return await db.query.ordersTable.findFirst({
        where: eq(ordersTable.ordersId,existingOrderId)
      })
}
 
// Create a New Order
export const createNewOrder = async(order:TOrderInsert):Promise<string> => {
       await db.insert(ordersTable).values(order).returning();
        return "Order Created Successfully 😎"
}
 
// Update an existing Order
export const updateExistingOrder = async(existingOrderId: number, order:TOrderInsert):Promise<string> => {
    await db.update(ordersTable).set(order).where(eq(ordersTable.ordersId,existingOrderId));
    return "Address Details  Updated Succeffully 😎";
}

 //delete an existing Order
export const deleteExistingOrder = async(existingOrderId: number):Promise<string> => {
   await db.delete(ordersTable).where(eq(ordersTable.ordersId,existingOrderId));
   return "Selected Order Deleted Sucessfully";
}