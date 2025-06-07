import { Router } from "express";
import {
  getCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
} from "./city.controller";

export const cityRouter = Router();

cityRouter.get('/cities', getCities);
cityRouter.get('/cities/:id', getCityById);
cityRouter.post('/cities', createCity);
cityRouter.put('/cities/:id', updateCity);
cityRouter.delete('/cities/:id', deleteCity);
