import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUserServices,
  getUserByEmailService,
  updateUserPasswordService,
} from "./auth.service";
import { getUserByIdServices } from "../users/users.service";
import { sendNotificationEmail } from "../middleware/mailer";
import { UserValidator, UserLoginValidator } from "../validation/user.validator";

// 🔹 REGISTER USER
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validation = UserValidator.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ error: validation.error.format() });
      return;
    }

    const user = validation.data;
    const existingUser = await getUserByEmailService(user.email);
    if (existingUser) {
      res.status(409).json({ error: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    const newUser = await createUserServices(user);

    await sendNotificationEmail(
      user.email,
      user.userName,
      "Account created successfully",
      "<b>Welcome to our food service</b>"
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        userId: newUser.userId,
        userName: newUser.userName,
        email: newUser.email,
        userType: newUser.userType,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    next(err);
  }
};

// 🔹 LOGIN USER
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validation = UserLoginValidator.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ error: validation.error.format() });
      return;
    }

    const { email, password } = validation.data;
    const user = await getUserByEmailService(email);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    const payload = {
      userId: user.userId,
      email: user.email,
      userType: user.userType,
    };

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: user.userId,
        userName: user.userName,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    next(err);
  }
};

// 🔹 REQUEST PASSWORD RESET
export const passwordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    const user = await getUserByEmailService(email);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const token = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    await sendNotificationEmail(
      email,
      user.userName,
      "Password Reset",
      `Click to reset: <a href="http://localhost:3000/api/auth/reset/${token}">Reset Password</a>`
    );

    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    console.error("Password Reset Error:", err);
    next(err);
  }
};

// 🔹 RESET PASSWORD
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password) {
      res.status(400).json({ error: "Token and password are required" });
      return;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };

    const user = await getUserByIdServices(payload.userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await updateUserPasswordService(user.email, hashedPassword);

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    next(err);
  }
};
