import { Request, Response, NextFunction } from "express";
import {
  createRestaurantService,
  deleteRestaurantService,
  getRestaurantByIdService,
  getRestaurantsService,
  updateRestaurantService,
} from "./restaurant.service";

// GET all restaurants
export const getRestaurants = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurants = await getRestaurantsService();
    if (!restaurants || restaurants.length === 0) {
      res.status(404).json({ message: "No restaurants found" });
      return;
    }
    res.status(200).json(restaurants);
  } catch (error) {
    next(error);
  }
};

// GET a restaurant by ID
export const getRestaurantById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const restaurant = await getRestaurantByIdService(id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }
    res.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
};

// POST create new restaurant
export const createRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  const { restaurantName, streetAddress, zipCode, cityId } = req.body;

  if (!restaurantName || !streetAddress || !zipCode || !cityId) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const message = await createRestaurantService({
      restaurantName,
      streetAddress,
      zipCode,
      cityId,
    });
    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

// PUT update restaurant
export const updateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  const { restaurantName, streetAddress, zipCode, cityId } = req.body;

  try {
    const message = await updateRestaurantService(id, {
      restaurantName,
      streetAddress,
      zipCode,
      cityId,
    });
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

// DELETE restaurant
export const deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const existing = await getRestaurantByIdService(id);
    if (!existing) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    const message = await deleteRestaurantService(id);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};
