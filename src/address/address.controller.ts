import { Request, Response, NextFunction } from "express";
import {
  createAddressServices,
  deleteAddressServices,
  getAddressByIdServices,
  getAddressesServices,
  updateAddressServices,
} from "./address.service";

// GET all address entries
export const getAddresses = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const all = await getAddressesServices();
    if (!all || all.length === 0) {
      res.status(404).json({ message: "No addresses found" });
      return;
    }
    res.status(200).json(all);
  } catch (error) {
    next(error);
  }
};

// GET one address by ID
export const getAddressById = async (
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
    const address = await getAddressByIdServices(id);
    if (!address) {
      res.status(404).json({ message: "Address not found" });
      return;
    }
    res.status(200).json(address);
  } catch (error) {
    next(error);
  }
};

// POST create new address
export const createAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    streetAddress1,
    streetAddress2,
    zipCode,
    deliveryInstructions,
    userId,
    cityId,
  } = req.body;

  if (
    !streetAddress1 ||
    typeof streetAddress1 !== "string" ||
    !zipCode ||
    typeof zipCode !== "string" ||
    typeof userId !== "number" ||
    typeof cityId !== "number"
  ) {
    res.status(400).json({ error: "Missing or invalid required fields" });
    return;
  }

  try {
    const message = await createAddressServices({
      streetAddress1,
      streetAddress2,
      zipCode,
      deliveryInstructions,
      userId,
      cityId,
    });
    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

// PUT update an address
export const updateAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  const {
    streetAddress1,
    streetAddress2,
    zipCode,
    deliveryInstructions,
    userId,
    cityId,
  } = req.body;

  try {
    const message = await updateAddressServices(id, {
      streetAddress1,
      streetAddress2,
      zipCode,
      deliveryInstructions,
      userId,
      cityId,
    });
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

// DELETE an address
export const deleteAddress = async (
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
    const existing = await getAddressByIdServices(id);
    if (!existing) {
      res.status(404).json({ message: "Address not found" });
      return;
    }

    const message = await deleteAddressServices(id);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};
