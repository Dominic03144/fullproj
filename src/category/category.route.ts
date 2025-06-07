import { Router } from "express";
import { getAllCategory,getExistingCategoriesById,createCategory,updateCategory,deleteCategory } from "./category.controller";



export const categoryRouter = Router();

//get all Categories
categoryRouter.get('/category',getAllCategory);


//get category by id
categoryRouter.get('/category/:id',getExistingCategoriesById);

//create a category

categoryRouter.post('/category',createCategory);

//update an existing category

categoryRouter.put('/category/:id',updateCategory);

// //delete an existing category
categoryRouter.delete('/category/:id',deleteCategory);