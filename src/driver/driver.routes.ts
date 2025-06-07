import { Router, Request, Response } from "express";
import { createDriver, deleteDriver, getDriverById, getDrivers } from "./driver.controller";

export const driverRouter = Router();

// Driver routes definition


// Get all drivers
driverRouter.get('/drivers', (req: Request, res: Response, next) => {
  Promise.resolve(getDrivers(req, res)).catch(next);
});

// Get driver by ID
driverRouter.get('/drivers/:id', (req: Request, res: Response, next) => {
  Promise.resolve(getDriverById(req, res)).catch(next);
});

// Create a new driver
driverRouter.post('/drivers', (req: Request, res: Response, next) => {
  Promise.resolve(createDriver(req, res)).catch(next);
});


// Delete an existing driver
driverRouter.delete('/drivers/:id', (req: Request, res: Response) => {
  deleteDriver(req, res);
});
