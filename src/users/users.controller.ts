// src/controllers/users.controller.ts
import { Request, Response } from 'express';
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService
} from '../services/users.service';
import { NewUser } from '../drizzle/schema';
import { z } from 'zod'; // Import Zod

// Zod schema for user creation input validation
export const createUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long").max(50, "Username cannot exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  passwordHash: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(['customer', 'employee', 'admin']).default('customer')
});

// Zod schema for user update input validation (all fields optional)
export const updateUserSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  email: z.string().email().optional(),
  passwordHash: z.string().min(6).optional(),
  role: z.enum(['customer', 'employee', 'admin']).optional()
}).partial(); // Makes all fields optional

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }
    const user = await getUserByIdService(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
}

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    // Validate request body using Zod
    const validatedData = createUserSchema.parse(req.body);
    const newUser: NewUser = validatedData; // Type assertion after validation

    const createdUsers = await createUserService(newUser);
    res.status(201).json(createdUsers[0]); // Return the first created user
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }
    // Validate request body using Zod
    const validatedData = updateUserSchema.parse(req.body);
    const updatedUsers = await updateUserService(id, validatedData);
    if (updatedUsers.length > 0) {
      res.status(200).json(updatedUsers[0]);
    } else {
      res.status(404).json({ message: 'User not found or no changes made' });
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }
    const deletedUsers = await deleteUserService(id);
    if (deletedUsers.length > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
}

