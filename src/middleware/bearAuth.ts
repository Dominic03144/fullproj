import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Declare enum roles from your pgEnum
export type UserType = "customer" | "owner" | "driver" | "admin" | "member";

// JWT token payload structure
type DecodedToken = {
  userId: string;
  email: string;
  userType: UserType;
  exp?: number;
};

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

// ✅ Token verification utility
export const verifyToken = async (
  token: string,
  secret: string
): Promise<DecodedToken | null> => {
  try {
    const decoded = jwt.verify(token, secret) as DecodedToken;
    return decoded;
  } catch (error) {
    return null;
  }
};

// ✅ Auth middleware factory with role-based access
export const authMiddleware = (requiredRole: UserType | "both") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(401)
        .json({ error: "Authorization header is missing" });
    }

    const decodedToken = await verifyToken(
      token,
      process.env.JWT_SECRET as string
    );

    if (!decodedToken) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Attach user info to request
    req.user = decodedToken;

    const userType = decodedToken.userType;

    // Check role
    const hasAccess =
      requiredRole === "both"
        ? userType === "admin" || userType === "member"
        : userType === requiredRole;

    if (!hasAccess) {
      return res.status(403).json({
        error: "Forbidden: You do not have permission to access this resource",
      });
    }

    next();
  };
};

// ✅ Prebuilt middleware for common roles
export const adminRoleAuth = authMiddleware("admin");
export const userRoleAuth = authMiddleware("member");
export const bothRolesAuth = authMiddleware("both");
export const ownerRoleAuth = authMiddleware("owner");
export const driverRoleAuth = authMiddleware("driver");
export const customerRoleAuth = authMiddleware("customer");
