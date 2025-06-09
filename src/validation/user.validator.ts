import { z } from "zod/v4";

export const UserValidator = z.object({
  userId: z.number().optional(),
  email: z.email().trim().nonempty(),
  userName: z.string().min(5).max(100).trim(),
  password: z.string().min(4).max(100).trim(),
  contactPhone: z.string().nonempty("Phone number is required"),
  confirmationCode:z.string().nonempty(),
  phoneVerified:z.boolean().optional(),
  emailVerified:z.boolean().optional(),
  userType: z.enum(["admin", "member", "driver", "owner"]).optional()
});

export const UserLoginValidator = z.object({
  email: z.email().trim(),
  password: z.string().min(4).max(100).trim(),
});

