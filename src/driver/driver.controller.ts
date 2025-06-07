import { Request, Response } from 'express';
import {
    getDriversServices,
    getDriverByIdServices,
    createDriverServices,
    updateDriverServices,
    deleteDriverServices
} from './driver.services'; // Adjust path if necessary

// Get all drivers
export const getDrivers = async (req: Request, res: Response) => {
    try {
        const drivers = await getDriversServices();
        return res.status(200).json(drivers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Get driver by ID
export const getDriverById = async (req: Request, res: Response) => {
    try {
        const driverId = parseInt(req.params.id);
        if (isNaN(driverId)) {
            return res.status(400).json({ error: "Invalid driver ID provided" });
        }
        const driver = await getDriverByIdServices(driverId);
        if (!driver) {
            return res.status(404).json({ error: "Driver not found" });
        }
        return res.status(200).json(driver);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}; // The missing closing curly brace was added here!

// Create a new driver
export const createDriver = async (req: Request, res: Response) => {
    try {
        const newDriver = req.body;
        const message = await createDriverServices(newDriver);
        return res.status(201).json({ message });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Update an existing driver
export const updateDriver = async (req: Request, res: Response) => {
    try {
        const driverId = parseInt(req.params.id);
        if (isNaN(driverId)) {
            return res.status(400).json({ error: "Invalid driver ID provided" });
        }
        const updatedDriver = req.body;
        const message = await updateDriverServices(driverId, updatedDriver);
        return res.status(200).json({ message });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a driver
export const deleteDriver = async (req: Request, res: Response) => {
    try {
        const driverId = parseInt(req.params.id);
        if (isNaN(driverId)) {
            return res.status(400).json({ error: "Invalid driver ID provided" });
        }
        const message = await deleteDriverServices(driverId);
        return res.status(200).json({ message });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
