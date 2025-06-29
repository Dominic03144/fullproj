import { Request, Response } from "express";
import {
  getExistingOrders,
  getExistingOrderById,
  createNewOrder,
  updateExistingOrder,
  deleteExistingOrder,
  getOrdersByUserId,
} from "./orders.services";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const allOrders = await getExistingOrders();
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  try {
    const order = await getExistingOrderById(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  const userId = Number(req.params.userId);
  try {
    const orders = await getOrdersByUserId(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
};

export const postOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = req.body;
    const requiredFields = ["userId", "finalPrice", "restaurantId", "estimatedDeliveryTime", "deliveryAddressId", "items"];
    for (const field of requiredFields) {
      if (!(field in orderData)) {
        res.status(400).json({ error: `Missing field: ${field}` });
        return;
      }
    }
    const newOrder = await createNewOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const putOrder = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  try {
    const updatedMessage = await updateExistingOrder(id, req.body);
    res.status(200).json({ message: updatedMessage });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  try {
    const deletedMessage = await deleteExistingOrder(id);
    res.status(200).json({ message: deletedMessage });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};
