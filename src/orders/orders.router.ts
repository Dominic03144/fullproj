import { Router } from "express";
import {
  getOrders,
  getOrderById,
  getUserOrders,
  postOrder,
  putOrder,
  deleteOrder,
} from "./orders.controller";

export const ordersRouter = Router();

ordersRouter.get("/orders", getOrders);
ordersRouter.get("/orders/:id", getOrderById);
ordersRouter.get("/orders/user/:userId", getUserOrders);
ordersRouter.post("/orders", postOrder);
ordersRouter.put("/orders/:id", putOrder);
ordersRouter.delete("/orders/:id", deleteOrder);
