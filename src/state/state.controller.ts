import { Request, Response, NextFunction } from "express";
import {
  createStateService,
  deleteStateService,
  getStateByIdService,
  getStatesService,
  updateStateService,
} from "./state.service";

// GET all states
export const getStates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const states = await getStatesService();
    if (!states || states.length === 0) {
      res.status(404).json({ message: "No states found" });
      return;
    }
    res.status(200).json(states);
  } catch (error) {
    next(error);
  }
};

// GET a state by ID
export const getStateById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const state = await getStateByIdService(id);
    if (!state) {
      res.status(404).json({ message: "State not found" });
      return;
    }
    res.status(200).json(state);
  } catch (error) {
    next(error);
  }
};

// POST create new state
export const createState = async (req: Request, res: Response, next: NextFunction) => {
  const { stateName, stateCode } = req.body;

  if (!stateName || !stateCode) {
    res.status(400).json({ error: "stateName and stateCode are required" });
    return;
  }

  try {
    const message = await createStateService({ stateName, stateCode });
    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

// PUT update state
export const updateState = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  const { stateName, stateCode } = req.body;

  try {
    const message = await updateStateService(id, { stateName, stateCode });
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

// DELETE state
export const deleteState = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const existing = await getStateByIdService(id);
    if (!existing) {
      res.status(404).json({ message: "State not found" });
      return;
    }

    const message = await deleteStateService(id);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};
