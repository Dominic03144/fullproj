// src/services/users.service.ts
import { db } from '../db';
import { users, NewUser, User } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export async function getAllUsersService(): Promise<User[]> {
  return await db.select().from(users);
}

export async function getUserByIdService(id: number): Promise<User | undefined> {
  return await db.select().from(users).where(eq(users.id, id)).limit(1).then(rows => rows[0]);
}

export async function createUserService(userData: NewUser): Promise<User[]> {
  // In a real app, you'd hash the password here before inserting
  return await db.insert(users).values(userData).returning();
}

export async function updateUserService(id: number, userData: Partial<NewUser>): Promise<User[]> {
  return await db.update(users).set(userData).where(eq(users.id, id)).returning();
}

export async function deleteUserService(id: number): Promise<User[]> {
  return await db.delete(users).where(eq(users.id, id)).returning();
}
