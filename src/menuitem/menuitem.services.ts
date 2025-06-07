import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { menuItemTable, TMenuItemInsert, TMenuItemSelect } from "../drizzle/schema";




//Get all MenuItems
export const getMenuItems = async():Promise<TMenuItemSelect[] | null> =>{
    return await db.query.menuItemTable.findMany({});


}

//Get menuItem by ID
export const getMenuItemsById = async(menuId:number):Promise<TMenuItemSelect | undefined> => {
    return await db.query.menuItemTable.findFirst(
        {
            where:eq(menuItemTable.menuId, menuId)
        }
    )
}

//Create a new menuItem
export const createNewMenuItem = async(menuItem:TMenuItemInsert):Promise<string> => {
    await db.insert(menuItemTable).values(menuItem).returning();
    return "MenuItem created Successfully🎉";
}

//update an existing menuItem
export const updateExistingMenuItem = async(menuId:number, menuItem:Partial<TMenuItemInsert>):Promise<string> => {
    await db.update(menuItemTable).set(menuItem).where(eq(menuItemTable.menuId, menuId));
    return "MenuItem updated Successfully 😎"
}

//Delete a restaurant
export const deleteExistingMenuItem = async(menuId:number):Promise<string> => {
    await db.delete(menuItemTable).where(eq(menuItemTable.menuId, menuId));
    return "MenuItem deleted Successfully 🎉"
}