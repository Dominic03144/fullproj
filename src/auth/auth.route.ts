import { Router } from "express";
import {
  createUser,
  loginUser,
  passwordReset,
  resetPassword,
} from "./auth.controller";

export const authRouter = Router();

authRouter.post("/auth/register", createUser);
authRouter.post("/auth/login", loginUser);
authRouter.post("/auth/password-reset", passwordReset);
authRouter.put("/auth/reset/:token", resetPassword);
