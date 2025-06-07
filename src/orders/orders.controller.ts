import { Request, Response } from "express";
import { getExistingOrders,getExistingOrderById,createNewOrder,updateExistingOrder,deleteExistingOrder} from "./orders.services";
 
//Business logic for Address Related operations
 
 
export const getOrders = async (req: Request, res: Response) => {
    try {
        const allOrders = await getExistingOrders();
        if (allOrders == null || allOrders.length == 0) {
          res.status(404).json({ message: "No Orders found" });
        }else{
            res.status(200).json(allOrders);            
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch orders " });
    }
}
 
export const getOrderById = async (req: Request, res: Response) => {
    const selectedOrderId = parseInt(req.params.id);
    if (isNaN(selectedOrderId)) {
        res.status(400).json({ error: "Invalid order ID" });
         return; // Prevent further execution
    }
    try {
        const orders = await getExistingOrderById(selectedOrderId);
        if (orders == undefined) {
            res.status(404).json({ message: "Order not found" });
        } else {
            res.status(200).json(orders);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to find Order" });
    }
}
 
export const createOrders = async (req: Request, res: Response) => {
    const { restaurantId,estimatedDeliveryTime,actualDeliveryTime,deliveryAddressId,userId,driverId,price,discount,finalPrice,comment} = req.body;
    if (!restaurantId||!estimatedDeliveryTime||!deliveryAddressId||!userId||!driverId||!discount||!finalPrice) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const createdOrder = await createNewOrder({ restaurantId,estimatedDeliveryTime,actualDeliveryTime,deliveryAddressId,userId,driverId,price,discount,finalPrice,comment });
        if (createdOrder == null) {
            res.status(500).json({ message: "Failed to create Order" });
        } else {
            res.status(201).json({message:createdOrder});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to create Order" });
    }
}
 
export const updateOrder = async (req: Request, res: Response) => {
    const selectedOrderId = parseInt(req.params.id);
    if (isNaN(selectedOrderId)) {
        res.status(400).json({ error: "Invalid Order Id" });
        return; // Prevent further execution
    }
    const { restaurantId,estimatedDeliveryTime,actualDeliveryTime,deliveryAddressId,userId,driverId,price,discount,finalPrice,comment} = req.body;
    if (!restaurantId||!estimatedDeliveryTime||!deliveryAddressId||!userId||!driverId||!discount||!finalPrice) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const updatedOrder = await updateExistingOrder(selectedOrderId, {restaurantId,estimatedDeliveryTime,actualDeliveryTime,deliveryAddressId,userId,driverId,price,discount,finalPrice,comment});
        if (updatedOrder == null) {
            res.status(404).json({ message: "Order not found or failed to update" });
        } else {
            res.status(200).json({message:updatedOrder});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update Order" });
    }
}
 
 
 
export const deleteOrder = async (req: Request, res: Response) => {
    const selectedOrderId = parseInt(req.params.id);  
    if (isNaN(selectedOrderId)) {
        res.status(400).json({ error: "Invalid Order ID" });
        return; // Prevent further execution
    }
    try {
        const deletedOrder = await deleteExistingOrder(selectedOrderId);
        if (deletedOrder) {
            res.status(200).json({ message: "Order deleted successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error:any) {    
        res.status(500).json({ error:error.message || "Failed to delete Order" });
    }    
}
