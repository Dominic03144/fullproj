import { Request, Response } from "express";
import { 
    createOwnerServices, 
    deleteOwnerServices, 
    getOwnerByIdServices, 
    getOwnersServices, 
    updateOwnerServices 
} from "./owner.service"; 



export const getOwners = async (req: Request, res: Response) => {
    try {
        const allOwners = await getOwnersServices(); 
        if (allOwners == null || allOwners.length == 0) {
            res.status(404).json({ message: "No owners found" });
        } else {
            res.status(200).json(allOwners);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to fetch owners" }); 
    }
}

export const getOwnerById = async (req: Request, res: Response) => {
    const ownerId = parseInt(req.params.id); 
    if (isNaN(ownerId)) {
        res.status(400).json({ error: "Invalid owner ID" }); 
        return;
    }
    try {
        const owner = await getOwnerByIdServices(ownerId); 
        if (owner == null) {
            res.status(404).json({ message: "Owner not found" });
        } else {
            res.status(200).json(owner);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to fetch owner" }); 
        
    }
}

export const createOwner = async (req: Request, res: Response) => {
    const { restaurantOwnerId, restaurantId, ownerId} = req.body;
    if (!restaurantOwnerId || !restaurantId || !ownerId ) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }
    try {
        const newOwner = await createOwnerServices({ restaurantOwnerId, restaurantId, ownerId  }); 
        if (newOwner == null) {
            res.status(500).json({ message: "Failed to create owner" }); 
        } else {
            res.status(201).json(newOwner);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to create owner" }); 
    }
}

export const updateOwner = async (req: Request, res: Response) => {
    const ownerId = parseInt(req.params.id); 
    if (isNaN(ownerId)) {
        res.status(400).json({ error: "Invalid owner ID" });
        return;
    }
    const { restaurantOwnerId, restaurantId } = req.body;
    if (!restaurantOwnerId || !restaurantId) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }
    try {
        const updatedOwner = await updateOwnerServices(ownerId, { restaurantOwnerId, restaurantId }); 
        if (updatedOwner == null) {
            res.status(404).json({ message: "Owner not found or failed to update" }); 
        } else {
            res.status(200).json(updatedOwner);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to update owner" }); 
    }
}

export const deleteOwner = async (req: Request, res: Response) => {
    const ownerId = parseInt(req.params.id); 
    if (isNaN(ownerId)) {
        res.status(400).json({ error: "Invalid owner ID" }); 
        return;
    }
    try {
        const deletedOwner = await deleteOwnerServices(ownerId); 
        if (deletedOwner) {
            res.status(200).json({ message: "Owner deleted successfully" }); 
        } else {
            res.status(404).json({ message: "Owner not found" }); 
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to delete owner" }); 
    }
}