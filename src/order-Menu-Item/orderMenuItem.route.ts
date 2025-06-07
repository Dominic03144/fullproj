
import { Router } from "express";
import { getOrderMenuItems,getOrdermenuItemById,createOrderMenuItem,updateOrderMenuItem,deleteOrderMenuItem } from "./orderMenuItem.controller";

 
export const ordersMenuItemRouter = Router();
// Orders routes definition
 
 
// Get all Order Menu Item
ordersMenuItemRouter.get('/ordermenuitem', getOrderMenuItems);
 
// Get Order Menu Item by ID
ordersMenuItemRouter.get('/ordermenuitem/:id', getOrdermenuItemById);
 
// Create a new Order Menu Item
ordersMenuItemRouter.post('/ordermenuitem', createOrderMenuItem);
 
// Update an existing Order Menu Item
ordersMenuItemRouter.put('/ordermenuitem/:id',updateOrderMenuItem);
 
 
// Delete an existing Order Menu Item
ordersMenuItemRouter.delete('/ordermenuitem/:id', deleteOrderMenuItem);
