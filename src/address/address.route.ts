import { Router } from "express";
import {
  createAddress,
  deleteAddress,
  getAddresses,
  getAddressById,
  updateAddress,
} from "./address.controller";

export const addressRouter = Router();

// Address routes definition

// Get all addresses
addressRouter.get("/addresses", getAddresses);

// Get an address by ID
addressRouter.get("/addresses/:id", getAddressById);

// Create a new address
addressRouter.post("/addresses", createAddress);

// Update an existing address
addressRouter.put("/addresses/:id", updateAddress);

// Delete an address
addressRouter.delete("/addresses/:id", deleteAddress);
