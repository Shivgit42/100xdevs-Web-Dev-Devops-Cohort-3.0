import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token missing or malformed" });
  }

  try {
    const verifiedData = jwt.verify(token, process.env.JWT_SECRET!);
    if (verifiedData) {
      //@ts-ignore
      req.userId = verifiedData.id;
      next();
    } else {
      res.status(403).json({
        message: "Invalid token",
      });
    }
  } catch (e) {
    if (e instanceof Error) {
      return res
        .status(403)
        .json({ message: "error while authorizing", error: e.message });
    } else {
      res.status(401).json({ message: "Unknown error" });
    }
  }
};
