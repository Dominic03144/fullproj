import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { categoryTable, TCategoryInsert, TCategorySelect } from "../drizzle/schema";




//Get all categories
export const getCategory = async():Promise<TCategorySelect[] | null> =>{
    return await db.query.categoryTable.findMany({});


}

//Get category by ID
export const getCategoryById = async(categoryId:number):Promise<TCategorySelect | undefined> => {
    return await db.query.categoryTable.findFirst(
        {
            where:eq(categoryTable.categoryId,categoryId)
        }
    )
}

//Create a new Category
export const createNewCategory = async(category:TCategoryInsert):Promise<string> => {
    await db.insert(categoryTable).values(category).returning();
    return "Category created Successfully🎉";
}

//update an existing Category
export const updateExistingCategory = async(categoryId:number, category:Partial<TCategoryInsert>):Promise<string> => {
    await db.update(categoryTable).set(category).where(eq(categoryTable.categoryId, categoryId));
    return "Category updated Successfully 😎"
}

//Delete a category
export const deleteExistingCategory = async(categoryId:number):Promise<string> => {
    await db.delete(categoryTable).where(eq(categoryTable.categoryId, categoryId));
    return "Category deleted Successfully 🎉"
}