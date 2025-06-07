import { Router } from "express";
import { getMenuItem,  getExistingMenuItemById, createMenuItem,updateMenuItem, deleteMenuItem } from "./menuitem.controller";



export const menuItemRouter = Router();

//get all menu Items
menuItemRouter.get('/menuitem',getMenuItem);


//get menu Item by id
menuItemRouter.get('/menuitem/:id',getExistingMenuItemById);

//create a newmenu Item

menuItemRouter.post('/menuitem',createMenuItem);

//update an existing menu Item

menuItemRouter.put('/menuitem/:id',updateMenuItem);

// //delete an existing restaurant
menuItemRouter.delete('/menuitem/:id',deleteMenuItem);