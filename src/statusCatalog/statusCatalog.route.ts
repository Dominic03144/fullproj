import { Router } from "express";
import { 
  createStatusCatalog, 
  deleteStatusCatalog, 
  getStatusCatalogs, 
  getStatusCatalogById, 
  updateStatusCatalog 
} from "./statusCatalog.controller";

export const statusCatalogRouter = Router();

// Status Catalog routes definition

// Get all status catalog entries
statusCatalogRouter.get('/status-catalog', getStatusCatalogs);

// Get a status catalog entry by ID
statusCatalogRouter.get('/status-catalog/:id', getStatusCatalogById);

// Create a new status catalog entry
statusCatalogRouter.post('/status-catalog', createStatusCatalog);

// Update an existing status catalog entry
statusCatalogRouter.put('/status-catalog/:id', updateStatusCatalog);

// Delete a status catalog entry
statusCatalogRouter.delete('/status-catalog/:id', deleteStatusCatalog);
