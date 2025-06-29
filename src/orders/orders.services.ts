import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import {
  ordersTable,
  orderMenuItemTable,
  TOrderInsert,
  TOrderMenuItemInsert,
} from "../drizzle/schema";

export const getExistingOrders = async () => {
  return await db.query.ordersTable.findMany({});
};

export const getExistingOrderById = async (id: number) => {
  return await db.query.ordersTable.findFirst({
    where: eq(ordersTable.ordersId, id),
  });
};

export const getOrdersByUserId = async (userId: number) => {
  return await db.query.ordersTable.findMany({
    where: eq(ordersTable.userId, userId),
  });
};

export const createNewOrder = async (order: TOrderInsert & {
  items: {
    menuId: number;
    quantity: number;
    itemPrice?: string;
    price?: string;
    comment?: string | null;
  }[];
}): Promise<any> => {
  const { items, ...orderData } = order;
  const estimatedDeliveryTime = new Date(orderData.estimatedDeliveryTime as any);
  const orderToInsert = {
    ...orderData,
    estimatedDeliveryTime,
  };

  const [insertedOrder] = await db.insert(ordersTable).values(orderToInsert).returning();
  if (!insertedOrder) throw new Error("Order insertion failed");

  const menuItemData: TOrderMenuItemInsert[] = items.map((item) => ({
    orderId: insertedOrder.ordersId,
    menuItemId: item.menuId,
    menuId: item.menuId, // only if field exists
    quantity: item.quantity,
    price: item.price ?? "0.00",
    itemPrice: item.itemPrice ?? "0.00",
    comment: item.comment ?? null,
  }));

  await db.insert(orderMenuItemTable).values(menuItemData);
  return insertedOrder;
};

export const updateExistingOrder = async (id: number, order: Partial<TOrderInsert>) => {
  await db.update(ordersTable).set(order).where(eq(ordersTable.ordersId, id));
  return "Order updated successfully.";
};

export const deleteExistingOrder = async (id: number) => {
  await db.delete(ordersTable).where(eq(ordersTable.ordersId, id));
  return "Order deleted successfully.";
};
