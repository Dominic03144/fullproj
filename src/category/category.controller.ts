import { Request, Response } from "express";
import { getCategory,getCategoryById,createNewCategory,updateExistingCategory, deleteExistingCategory,} from "./category.service";



export const getAllCategory = async (req:Request, res:Response) => {
    try{
        const category = await getCategory();
        if (category == null || category.length == 0) {
            res.status(404).json({ message: "No Categories found" });
        }
        else{
            res.status(200).json(category);
        }
    }catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to fetch Categories" });
    }
}
export const getExistingCategoriesById = async (req:Request, res:Response) => {
    const ExistingCategoryId = parseInt(req.params.id);
    if (isNaN(ExistingCategoryId )) {
        res.status(400).json({ error: "Invalid Category Id" });
        return; // Prevent further execution
    }
    try {
        const category = await getCategoryById(ExistingCategoryId);
        if (category  == null) {
            res.status(404).json({ message: "category not found" });
        } else {
            res.status(200).json(category );
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to fetch Category" });
    }
}
export const createCategory = async (req:Request, res:Response) => {
    const {categoryName} = req.body;
    if(!categoryName) {
    res.status(400).json({ error: "Category field is required" });
        return; // Prevent further execution
    }
    try{
        const category = await  createNewCategory({categoryName});
        if (category == null) {
            res.status(500).json({ message: "Failed to create Category" });
        } else {
            res.status(201).json({ message: category });
        }

    }catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to create New Category" });
    }
}

export const updateCategory = async (req:Request, res:Response) => {
    const categoryExistingId = parseInt(req.params.id);
    if (isNaN(categoryExistingId)) {
        res.status(400).json({ error: "Invalid category ID" });
        return; // Prevent further execution
    }
    const {categoryName} = req.body
    if (!categoryName) {
        res.status(400).json({ error: "Category Name field is required" });
        return; // Prevent further execution
    } try{
        const updatedCategory = await updateExistingCategory(
            categoryExistingId,
            {categoryName}
        );
        if (updatedCategory == null) {
            res.status(500).json({ message: "Failed to update Category" });
        } else {
            res.status(200).json({ message: updatedCategory});
        }
    }catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to update Category" });
    }
}

export const deleteCategory = async (req:Request, res:Response) => {
    const categoryId = parseInt(req.params.id);
    if (isNaN(categoryId)) {
        res.status(400).json({ error: "Invalid category ID" });
        return; // Prevent further execution
    }
    const ExistingCategory = await getCategoryById(categoryId);
    if(!ExistingCategory) {
        res.status(404).json({ message: "Category not found or failed to delete" });
        return; // Prevent further execution
    }
    try {
        const deletedCategory = await deleteExistingCategory (categoryId);
        if (deletedCategory) {
            res.status(404).json({message: "Category Deleted Successfully"});
        } else {
            res.status(200).json({ message: "Category not found"});
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to delete Category" });
    }
}
