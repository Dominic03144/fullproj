import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Declare enum roles from your pgEnum
export type UserType = "customer" | "owner" | "driver" | "admin" | "member";

// Token payload structure
type DecodedToken = {
  userId: string;
  email: string;
  userType: UserType;
  exp?: number;
};

// Extend Express request
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

// ✅ Verify Token Function
export const verifyToken = async (token: string, secret: string): Promise<DecodedToken | null> => {
  try {
    const decoded = jwt.verify(token, secret) as DecodedToken;
    return decoded;
  } catch (error) {
    return null;
  }
};

// ✅ Main Auth Middleware Factory
export const authMiddleware = (requiredRole: UserType | "both") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }

    const decodedToken = await verifyToken(token, process.env.JWT_SECRET as string);

    if (!decodedToken) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const userType = decodedToken.userType;

    const hasAccess =
      requiredRole === "both"
        ? userType === "admin" || userType === "member"
        : userType === requiredRole;

    if (!hasAccess) {
      return res.status(403).json({ error: "Forbidden: You do not have permission to access this resource" });
    }

    req.user = decodedToken;
    next();
  };
};

// ✅ Export ready-to-use role-based middleware
export const adminRoleAuth = authMiddleware("admin");
export const userRoleAuth = authMiddleware("member");
export const bothRolesAuth = authMiddleware("both");
export const ownerRoleAuth = authMiddleware("owner");
export const driverRoleAuth = authMiddleware("driver");
export const customerRoleAuth = authMiddleware("customer");
