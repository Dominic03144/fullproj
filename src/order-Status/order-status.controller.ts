import { Request, Response } from "express";
import { getAllOrderStatus,getExistingOrderStatusById, createNewOrderStatus,updateExistingOrderStatus,deleteExistingOrderStatus} from "./order-status.service";



export const getOrderStatus = async (req:Request, res:Response) => {
    try{
        const OrderStatus = await getAllOrderStatus();
        if (OrderStatus == null || OrderStatus.length == 0) {
            res.status(404).json({ message: "No Order Status found" });
        }
        else{
            res.status(200).json(OrderStatus);
        }
    }catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to fetch Order Status" });
    }
}
export const getOrderStatusById = async (req:Request, res:Response) => {
    const selectedOrderStatusId = parseInt(req.params.id);
    if (isNaN(selectedOrderStatusId)) {
        res.status(400).json({ error: "Invalid Order Status Id" });
        return; // Prevent further execution
    }
    try {
        const OrderStatus = await getExistingOrderStatusById(selectedOrderStatusId);
        if (OrderStatus  == null) {
            res.status(404).json({ message: "Order Status  not found" });
        } else {
            res.status(200).json(OrderStatus );
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to fetch Order Status" });
    }
}
export const createOrderStatus = async (req:Request, res:Response) => {
    const {orderId,statusCatalogId} = req.body;
    if(!orderId||!statusCatalogId) {
    res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try{
        const newOrderStatus = await  createNewOrderStatus({orderId,statusCatalogId});
        if (newOrderStatus == null) {
            res.status(500).json({ message: "Failed to create Order Status" });
        } else {
            res.status(201).json({ message: newOrderStatus });
        }

    }catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to create New Order Status" });
    }
}

export const updateOrderStatus = async (req:Request, res:Response) => {
    const existingOrderStatusId = parseInt(req.params.id);
    if (isNaN(existingOrderStatusId)) {
        res.status(400).json({ error: "Invalid Order Status ID" });
        return; // Prevent further execution
    }
    const {orderId,statusCatalogId} = req.body
    if (!orderId||!statusCatalogId) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    } try{
        const updatedOrderStatus = await updateExistingOrderStatus(existingOrderStatusId,
            {orderId,statusCatalogId}
        );
        if (updatedOrderStatus == null) {
            res.status(500).json({ message: "Failed to update OrderStatus" });
        } else {
            res.status(200).json({ message: updatedOrderStatus});
        }
    }catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to update Order Status" });
    }
}

export const deleteOrderStatus = async (req:Request, res:Response) => {
    const selectedOrderStatusId = parseInt(req.params.id);
    if (isNaN(selectedOrderStatusId)) {
        res.status(400).json({ error: "Invalid Order Status ID" });
        return; // Prevent further execution
    }
    const existingOrderStatus = await getExistingOrderStatusById(selectedOrderStatusId);
    if(!existingOrderStatus) {
        res.status(404).json({ message: "Order Status not found or failed to delete" });
        return; // Prevent further execution
    }
    try {
        const deletedOrderStatus = await deleteExistingOrderStatus (selectedOrderStatusId);
        if (deletedOrderStatus) {
            res.status(404).json({message: "Order Status Deleted Successfully"});
        } else {
            res.status(200).json({ message: "Order Status not found"});
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to delete Order Status" });
    }
}
