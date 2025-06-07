import { Request, Response, NextFunction } from "express";
import {
  createCityService,
  deleteCityService,
  getCityByIdService,
  getCitiesService,
  updateCityService,
} from "./city.service";

// GET all cities
export const getCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cities = await getCitiesService();
    if (!cities || cities.length === 0) {
      res.status(404).json({ message: "No cities found" });
      return;
    }
    res.status(200).json(cities);
  } catch (error) {
    next(error);
  }
};

// GET a city by ID
export const getCityById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const city = await getCityByIdService(id);
    if (!city) {
      res.status(404).json({ message: "City not found" });
      return;
    }
    res.status(200).json(city);
  } catch (error) {
    next(error);
  }
};

// POST create new city
export const createCity = async (req: Request, res: Response, next: NextFunction) => {
  const { cityName, stateId } = req.body;

  if (!cityName || !stateId) {
    res.status(400).json({ error: "cityName and stateId are required" });
    return;
  }

  try {
    const message = await createCityService({ cityName, stateId });
    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

// PUT update city
export const updateCity = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  const { cityName, stateId } = req.body;

  try {
    const message = await updateCityService(id, { cityName, stateId });
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

// DELETE city
export const deleteCity = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const existing = await getCityByIdService(id);
    if (!existing) {
      res.status(404).json({ message: "City not found" });
      return;
    }

    const message = await deleteCityService(id);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};
