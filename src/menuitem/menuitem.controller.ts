import { Request, Response } from "express";
import { getMenuItems,getMenuItemsById,createNewMenuItem,updateExistingMenuItem, deleteExistingMenuItem,} from "./menuitem.services";



export const getMenuItem = async (req:Request, res:Response) => {
    try{
        const menuItem = await getMenuItems();
        if (menuItem == null || menuItem.length == 0) {
            res.status(404).json({ message: "No Menu Items found" });
        }
        else{
            res.status(200).json(menuItem);
        }
    }catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to fetch Menu Items" });
    }
}
export const getExistingMenuItemById = async (req:Request, res:Response) => {
    const ExistingMenuItemId = parseInt(req.params.id);
    if (isNaN(ExistingMenuItemId)) {
        res.status(400).json({ error: "Invalid Menu Item Id" });
        return; // Prevent further execution
    }
    try {
        const menuItem = await getMenuItemsById(ExistingMenuItemId);
        if (menuItem  == null) {
            res.status(404).json({ message: "Menu Item  not found" });
        } else {
            res.status(200).json(menuItem );
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to fetch Menu Item" });
    }
}
export const createMenuItem = async (req:Request, res:Response) => {
    const {menuName,restaurantId,categoryId,description,ingredients,price,active} = req.body;
    if(!menuName || !restaurantId || !categoryId ||!description || !ingredients|| !price || !active) {
    res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try{
        const newMenuItem = await  createNewMenuItem({menuName,restaurantId,categoryId,description,ingredients,price,active});
        if (newMenuItem == null) {
            res.status(500).json({ message: "Failed to create Menu Item" });
        } else {
            res.status(201).json({ message: newMenuItem });
        }

    }catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to create New Menu Item" });
    }
}

export const updateMenuItem = async (req:Request, res:Response) => {
    const menuItemExistingId = parseInt(req.params.id);
    if (isNaN(menuItemExistingId)) {
        res.status(400).json({ error: "Invalid menuItem ID" });
        return; // Prevent further execution
    }
    const {menuName,restaurantId,categoryId,description,ingredients,price,active} = req.body
    if (!menuName || !restaurantId || !categoryId ||!description || !ingredients|| !price || !active) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    } try{
        const updatedMenuItem = await updateExistingMenuItem(
            menuItemExistingId,
            {menuName,restaurantId,categoryId,description,ingredients,price,active}
        );
        if (updatedMenuItem == null) {
            res.status(500).json({ message: "Failed to update Menu Item" });
        } else {
            res.status(200).json({ message: updatedMenuItem});
        }
    }catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to update Menu Item" });
    }
}

export const deleteMenuItem = async (req:Request, res:Response) => {
    const menuItemId = parseInt(req.params.id);
    if (isNaN(menuItemId)) {
        res.status(400).json({ error: "Invalid Menu Item ID" });
        return; // Prevent further execution
    }
    const ExistingMenuItem = await getMenuItemsById(menuItemId);
    if(!ExistingMenuItem) {
        res.status(404).json({ message: "Menu Item not found or failed to delete" });
        return; // Prevent further execution
    }
    try {
        const deletedMenuItem = await deleteExistingMenuItem (menuItemId);
        if (deletedMenuItem) {
            res.status(404).json({message: "Menu Item Deleted Successfully"});
        } else {
            res.status(200).json({ message: "Menu Item not found"});
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to delete Menu Item" });
    }
}
