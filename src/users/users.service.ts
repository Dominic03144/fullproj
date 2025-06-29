import { db } from "../drizzle/db";
// Make sure the file exists at this path and is named 'UserTable.ts' (case-sensitive).
// If the file is named 'userTable.ts', update the import as follows:
import { userTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const getUsersServices = async () => {
  return await db.select().from(userTable);
};

export const getUserByIdServices = async (id: number) => {
  const result = await db.select().from(userTable).where(eq(userTable.userId, id));
  return result[0];
};

export const createUserServices = async (userData: {
  userName: string;
  contactPhone: string;
  email: string;
  confirmationCode: string;
  password: string;
}) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const [user] = await db
    .insert(userTable)
    .values({ ...userData, password: hashedPassword })
    .returning();

  return user;
};

export const updateUserServices = async (id: number, updatedData: any) => {
  const hashedPassword = await bcrypt.hash(updatedData.password, 10);

  const [user] = await db
    .update(userTable)
    .set({ ...updatedData, password: hashedPassword })
    .where(eq(userTable.userId, id))
    .returning();

  return user;
};

export const deleteUserServices = async (id: number) => {
  const result = await db.delete(userTable).where(eq(userTable.userId, id));
  return (result.rowCount ?? 0) > 0;
};

export type UserType = "customer" | "owner" | "driver" | "admin" | "member";

export const updateUserRoleService = async (id: number, userType: UserType) => {
  const [user] = await db
    .update(userTable)
    .set({ userType })
    .where(eq(userTable.userId, id))
    .returning();

  return user;
};
