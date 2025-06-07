
import { Router } from "express";
import { createOrderStatus, updateOrderStatus,deleteOrderStatus,getOrderStatus,getOrderStatusById} from "./order-status.controller";

 
export const ordersStatusRouter = Router();
// Order Status routes definition
 
 
// Get all Order Status
ordersStatusRouter.get('/orderstatus', getOrderStatus);
 
// Get Order Status by ID
ordersStatusRouter.get('/orderstatus/:id', getOrderStatusById);
 
// Create a new Order Status
ordersStatusRouter.post('/orderstatus', createOrderStatus);
 
// Update an existing Order Status
ordersStatusRouter.put('/orderstatus/:id',updateOrderStatus);
 
 
// Delete an existing Order Status
ordersStatusRouter.delete('/orderstatus/:id', deleteOrderStatus);
