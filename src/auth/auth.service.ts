import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { TUserInsert, TUserSelect, userTable } from "../drizzle/schema";

// Register a new user
export const createUserServices = async (
  user: TUserInsert
): Promise<TUserSelect> => {
  const [createdUser] = await db.insert(userTable).values(user).returning();
  if (!createdUser) {
    throw new Error("User creation failed");
  }
  return createdUser;
};

// Get user by email
export const getUserByEmailService = async (
  email: string
): Promise<TUserSelect | undefined> => {
  return await db.query.userTable.findFirst({
    where: eq(userTable.email, email),
  });
};

// Update password
export const updateUserPasswordService = async (
  email: string,
  newPassword: string
): Promise<string> => {
  const result = await db
    .update(userTable)
    .set({ password: newPassword })
    .where(eq(userTable.email, email))
    .returning();

  if (result.length === 0) {
    throw new Error("User not found or password update failed");
  }

  return "Password updated successfully";
};
