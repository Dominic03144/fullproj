// src/controllers/statusCatalog.controller.ts

import { Request, Response, NextFunction } from "express";
import {
  createStatusCatalogServices,
  deleteStatusCatalogServices,
  getStatusCatalogByIdServices,
  getStatusCatalogsServices,
  updateStatusCatalogServices,
} from "./statusCatalog.service";

// GET all status catalog entries
export const getStatusCatalogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const all = await getStatusCatalogsServices();
    if (!all || all.length === 0) {
      res.status(404).json({ message: "No status catalog entries found" });
      return;
    }
    res.status(200).json(all);
  } catch (error) {
    next(error);
  }
};

// GET one status catalog entry by ID
export const getStatusCatalogById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const status = await getStatusCatalogByIdServices(id);
    if (!status) {
      res.status(404).json({ message: "Status catalog entry not found" });
      return;
    }
    res.status(200).json(status);
  } catch (error) {
    next(error);
  }
};

// POST create new status catalog entry
export const createStatusCatalog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { statusCatalogName } = req.body;

  if (!statusCatalogName || typeof statusCatalogName !== "string") {
    res.status(400).json({ error: "statusCatalogName is required" });
    return;
  }

  try {
    const message = await createStatusCatalogServices({ statusCatalogName });
    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

// PUT update a status catalog entry
export const updateStatusCatalog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  const { statusCatalogName } = req.body;

  if (!statusCatalogName || typeof statusCatalogName !== "string") {
    res.status(400).json({ error: "statusCatalogName is required" });
    return;
  }

  try {
    const message = await updateStatusCatalogServices(id, { statusCatalogName });
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

// DELETE a status catalog entry
export const deleteStatusCatalog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const existing = await getStatusCatalogByIdServices(id);
    if (!existing) {
      res.status(404).json({ message: "Status catalog entry not found" });
      return;
    }

    const message = await deleteStatusCatalogServices(id);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};
