import  db  from "../drizzle/db";
import { orderStatusTable, TOrderStatusSelect , TOrderStatusInsert} from "../drizzle/schema";
import { eq } from "drizzle-orm";


//GET ALL ORDER STATUS
export const getAllOrderStatus = async():Promise<TOrderStatusSelect[] | null> =>{
    return await db.query.orderStatusTable.findMany({});


}

//Get Order Status by ID
export const getExistingOrderStatusById = async(existingOrderStatusId:number):Promise<TOrderStatusSelect | undefined> => {
    return await db.query.orderStatusTable.findFirst(
        {
            where:eq(orderStatusTable.orderStatusId, existingOrderStatusId)
        }
    )
}

//Create a new Order Status
export const createNewOrderStatus = async(menuItem:TOrderStatusInsert):Promise<string> => {
    await db.insert(orderStatusTable).values(menuItem).returning();
    return "Order Status created Successfully🎉";
}

//update an existing Order Status
export const updateExistingOrderStatus= async(existingOrderStatusId:number, menuItem:Partial<TOrderStatusInsert>):Promise<string> => {
    await db.update(orderStatusTable).set(menuItem).where(eq(orderStatusTable.orderStatusId, existingOrderStatusId));
    return "Order Status updated Successfully 😎"
}

//Delete a existing  Order Status
export const deleteExistingOrderStatus = async(existingOrderStatusId:number):Promise<string> => {
    await db.delete(orderStatusTable).where(eq(orderStatusTable.orderStatusId, existingOrderStatusId));
    return "Order Status deleted Successfully 🎉"
}