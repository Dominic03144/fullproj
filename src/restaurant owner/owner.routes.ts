import { Router } from "express";
import { 
    createOwner, 
    deleteOwner, 
    getOwnerById, 
    getOwners, 
    updateOwner 
} from "./owner.controller"; 

export const ownerRouter = Router(); 

// Owner routes definition

// Get all owners
ownerRouter.get('/owners', getOwners); 

// Get owner by ID
ownerRouter.get('/owners/:id', getOwnerById); 

// Create a new owner
ownerRouter.post('/owners', createOwner); 

// Update an existing owner
ownerRouter.put('/owners/:id', updateOwner); 


// Delete an existing owner
ownerRouter.delete('/owners/:id', deleteOwner); 