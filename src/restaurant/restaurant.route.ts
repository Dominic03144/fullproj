// src/routes/restaurant.routes.ts

import { Router } from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
} from "./restaurant.controller";

export const restaurantRouter = Router();

// Restaurant routes definition

// Get all restaurants
restaurantRouter.get("/restaurants", getRestaurants);

// Get a restaurant by ID
restaurantRouter.get("/restaurants/:id", getRestaurantById);

// Create a new restaurant
restaurantRouter.post("/restaurants", createRestaurant);

// Update an existing restaurant
restaurantRouter.put("/restaurants/:id", updateRestaurant);

// Delete a restaurant
restaurantRouter.delete("/restaurants/:id", deleteRestaurant);
