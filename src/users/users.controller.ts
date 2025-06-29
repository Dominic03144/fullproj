import { Request, Response } from "express";
import {
  createUserServices,
  deleteUserServices,
  getUserByIdServices,
  getUsersServices,
  updateUserServices,
  updateUserRoleService
} from "./users.service";

// GET all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getUsersServices();
    if (!users || users.length === 0) {
      res.status(404).json({ message: "No users found" });
    } else {
      res.status(200).json(users);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch users" });
  }
};

// GET user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }

  try {
    const user = await getUserByIdServices(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch user" });
  }
};

// POST create new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { userName, contactPhone, email, confirmationCode, password } = req.body;

  if (!userName || !contactPhone || !email || !confirmationCode || !password) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const newUser = await createUserServices({ userName, contactPhone, email, confirmationCode, password });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create user" });
  }
};

// PUT update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id);
  const { userName, contactPhone, phoneVerified, email, emailVerified, confirmationCode, password } = req.body;

  if (
    !userName || !contactPhone || phoneVerified === undefined ||
    !email || emailVerified === undefined || !confirmationCode || !password
  ) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const updatedUser = await updateUserServices(userId, {
      userName,
      contactPhone,
      phoneVerified,
      email,
      emailVerified,
      confirmationCode,
      password,
    });

    if (!updatedUser) {
      res.status(404).json({ error: "User not found or failed to update" });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update user" });
  }
};

// DELETE user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }

  try {
    const deleted = await deleteUserServices(userId);
    if (deleted) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete user" });
  }
};

// PATCH /users/:id/role - update role
export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id);
  const { userType } = req.body;

  if (!userType) {
    res.status(400).json({ error: "userType is required" });
    return;
  }

  try {
    const updated = await updateUserRoleService(userId, userType);
    if (!updated) {
      res.status(404).json({ error: "User not found or failed to update role" });
      return;
    }
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
