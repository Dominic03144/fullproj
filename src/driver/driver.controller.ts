import { Request, Response } from "express";
import { createDriverServices, deleteDriverServices, getDriverByIdServices, getDriversServices, updateDriverServices } from "./driver.service";

//Business logic for driver-related operations
export const getDrivers = async (req: Request, res: Response) => {
    try {
        const allDrivers = await getDriversServices();
        if (allDrivers == null || allDrivers.length == 0) {
          res.status(404).json({ message: "No drivers found" });
        }else{
            res.status(200).json(allDrivers);             
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch drivers" });
    }
}

export const getDriverById = async (req: Request, res: Response) => {
    const driverId = parseInt(req.params.id);
    if (isNaN(driverId)) {
        res.status(400).json({ error: "Invalid driver ID" });
         return; 
    }
    try {
        const driver = await getDriverByIdServices(driverId);
        if (driver == null) {
            res.status(404).json({ message: "Driver not found" });
        } else {
            res.status(200).json(driver);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch driver" });
    }
}

export const createDriver = async (req: Request, res: Response) => {
    const {carMake,carModel,carYear ,userId} = req.body;
    if (!carMake|| !carModel|| !carYear) {
        res.status(400).json({ error: "All fields are required" });
        return; 
    }
    try {
        const newDriver = await createDriverServices({carMake,carModel,carYear,userId});
        if (newDriver == null) {
            res.status(500).json({ message: "Failed to create driver" });
        } else {
            res.status(201).json(newDriver);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to create driver" });
    }
}

export const updateDriver = async (req: Request, res: Response) => {
    const driverId = parseInt(req.params.id);
    if (isNaN(driverId)) {
        res.status(400).json({ error: "Invalid driver ID" });
        return; 
    }
    const { carMake,carModel,carYear } = req.body;
    if (!carMake || !carModel|| !carYear) {
        res.status(400).json({ error: "All fields are required" });
        return; 
    }
    try {
        const updatedDriver = await updateDriverServices(driverId, {carMake,carModel,carYear });
        if (updatedDriver == null) {
            res.status(404).json({ message: "Driver not found or failed to update" });
        } else {
            res.status(200).json(updatedDriver);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update driver" });
    }
}


export const deleteDriver = async (req: Request, res: Response) => {
    const driverId = parseInt(req.params.id);  
    if (isNaN(driverId)) {
        res.status(400).json({ error: "Invalid driver ID" });
        return; 
    }
    try {
        const deletedDriver = await deleteDriverServices(driverId);
        if (deletedDriver) {
            res.status(200).json({ message: "Driver deleted successfully" });
        } else {
            res.status(404).json({ message: "Driver not found" });
        }
    } catch (error:any) {    
        res.status(500).json({ error:error.message || "Failed to delete driver" });
    }    
}