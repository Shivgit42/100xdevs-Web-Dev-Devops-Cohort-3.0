import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({
        message: "Missing token or Malformed token",
      });
    }

    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )) as JwtPayload;

    req.userId = decoded.id;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: "Error while authenticating" });
  }
};
