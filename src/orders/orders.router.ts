
import { Router } from "express";
import { createOrders, deleteOrder, getOrderById, getOrders, updateOrder } from "./orders.controller";

 
export const ordersRouter = Router();
// Orders routes definition
 
 
// Get all Orders
ordersRouter.get('/orders', getOrders);
 
// Get Orders by ID
ordersRouter.get('/orders/:id', getOrderById);
 
// Create a new Order
ordersRouter.post('/orders', createOrders);
 
// Update an existing Order
ordersRouter.put('/orders/:id',updateOrder);
 
 
// Delete an existing Order
ordersRouter.delete('/orders/:id', deleteOrder);
