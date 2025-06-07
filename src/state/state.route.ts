import { Router } from "express";
import {
  getStates,
  getStateById,
  createState,
  updateState,
  deleteState,
} from "./state.controller";

export const stateRouter = Router();

stateRouter.get("/states", getStates);
stateRouter.get("/states/:id", getStateById);
stateRouter.post("/states", createState);
stateRouter.put("/states/:id", updateState);
stateRouter.delete("/states/:id", deleteState);
