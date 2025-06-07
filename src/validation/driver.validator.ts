import { z } from "zod/v4";

export const driverValidator = z.object({
  carMake: z.string().min(1, "Car make is required"),
  carModel: z.string().min(1, "Car model is required"),
  carYear: z
    .number("Car year must be a number" )
    .int("Car year must be an integer")
    .gte(1980, "Car year must be 1980 or later")
    .lte(new Date().getFullYear(), "Car year cannot be in the future"),

  online: z.boolean().optional(),
  delivering: z.boolean().optional(),
});
