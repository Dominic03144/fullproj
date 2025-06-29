import { Router } from "express";
import {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver
} from "./driver.controller";

export const driverRouter = Router();

// List all drivers
driverRouter.get("/drivers", getDrivers);

// Create a driver
driverRouter.post("/drivers", createDriver);

// Get a driver by ID
driverRouter.get("/drivers/:id", getDriverById);

// Update a driver by ID
driverRouter.put("/drivers/:id", updateDriver);

// Delete a driver by ID
driverRouter.delete("/drivers/:id", deleteDriver);
