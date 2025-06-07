import { Request, Response } from "express";
import { getAllExistingOrderMenuItems, getExistingOrderMenuItemById,createNewOrderMenuItem,updateExistingOrderMenuItem,deleteExistingOrderMenuItem} from "./orderMenuItem.services";
 
//Business logic for Order Menu Item Related operations
 
 
export const getOrderMenuItems = async (req: Request, res: Response) => {
    try {
        const allOrdersMenuItems = await getAllExistingOrderMenuItems();
        if (allOrdersMenuItems == null || allOrdersMenuItems.length == 0) {
          res.status(404).json({ message: "No Order Menu Items found" });
        }else{
            res.status(200).json(allOrdersMenuItems);            
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch order menu Items  " });
    }
}
 
export const getOrdermenuItemById = async (req: Request, res: Response) => {
    const insertedOrderMenuItemId = parseInt(req.params.id);
    if (isNaN(insertedOrderMenuItemId)) {
        res.status(400).json({ error: "Invalid order Menu Item ID" });
         return; // Prevent further execution
    }
    try {
        const orderMenuItem = await getExistingOrderMenuItemById(insertedOrderMenuItemId);
        if (orderMenuItem == undefined) {
            res.status(404).json({ message: "Order Menu Item not found" });
        } else {
            res.status(200).json(orderMenuItem);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to find Order Menu Item" });
    }
}
 
export const createOrderMenuItem = async (req: Request, res: Response) => {
    const { orderId,menuItemId,quantity,itemPrice,price,comment} = req.body;
    if (!orderId||!menuItemId||!quantity||!itemPrice||!price) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const createdOrderMenuItem = await createNewOrderMenuItem({orderId,menuItemId,quantity,itemPrice,price,comment});
        if (createdOrderMenuItem == null) {
            res.status(500).json({ message: "Failed to create Order Menu Item" });
        } else {
            res.status(201).json({message:createdOrderMenuItem});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to create Order Menu Item" });
    }
}
 
export const updateOrderMenuItem = async (req: Request, res: Response) => {
    const insertedOrderMenuItemId = parseInt(req.params.id);
    if (isNaN(insertedOrderMenuItemId)) {
        res.status(400).json({ error: "Invalid Order Menu Item Id" });
        return; // Prevent further execution
    }
    const { orderId,menuItemId,quantity,itemPrice,price,comment} = req.body;
    if (!orderId||!menuItemId||!quantity||!itemPrice||!price) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const updatedOrderMenuItem = await updateExistingOrderMenuItem(insertedOrderMenuItemId, {orderId,menuItemId,quantity,itemPrice,price,comment});
        if (updatedOrderMenuItem == null) {
            res.status(404).json({ message: "Order Menu Item  not found or failed to update" });
        } else {
            res.status(200).json({message:updatedOrderMenuItem});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update Order Menu Item " });
    }
}
 
 
 
export const deleteOrderMenuItem = async (req: Request, res: Response) => {
    const selectedOrderMenuItemId = parseInt(req.params.id);  
    if (isNaN(selectedOrderMenuItemId)) {
        res.status(400).json({ error: "Invalid Order Menu Item ID" });
        return; // Prevent further execution
    }
    try {
        const deletedOrderMenuItem = await deleteExistingOrderMenuItem(selectedOrderMenuItemId);
        if (deletedOrderMenuItem) {
            res.status(200).json({ message: "Order Menu Item  deleted successfully" });
        } else {
            res.status(404).json({ message: "Order Menu Item not found" });
        }
    } catch (error:any) {    
        res.status(500).json({ error:error.message || "Failed to delete Order Menu Item " });
    }    
}
