import z from "zod";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  REFRESH_MAX_AGE_MS,
  signAccessToken,
  signRefreshToken,
} from "../utils/jwt";
import { Numeric } from "zod/v4/core/util.cjs";

const prisma = new PrismaClient();

const credsSchema = z.object({
  username: z.string().min(1, "Username required"),
  password: z.string().min(6, "password must be at least 6 chars"),
});

//Signup
export const userSignup = async (req: Request, res: Response) => {
  const parsed = credsSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Incorrect input",
      error: parsed.error,
    });
  }

  const { username, password } = parsed.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return res.json({
      message: "You have signed up successfully",
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//Signin
export const userSignin = async (req: Request, res: Response) => {
  const parsed = credsSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Incorrect input",
      error: parsed.error,
    });
  }

  const { username, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(403).json({
      message: "Incorrect Credentials!",
    });
  }

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res.status(403).json({ message: "Invalid credentials" });
  }

  const accessToken = signAccessToken({ id: user.id });
  const refreshToken = signRefreshToken({ id: user.id });

  const refreshHash = await bcrypt.hash(refreshToken, 10);
  const expiresAt = new Date(Date.now() + REFRESH_MAX_AGE_MS);
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: refreshHash,
      expiresAt,
    },
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: REFRESH_MAX_AGE_MS,
    path: "/",
  });

  return res.json({
    accessToken,
    user: { id: user.id, username: user.username },
  });
};

// rotate refresh token and issue new access
export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies?.["refresh_token"];
  if (!token) return res.status(401).json({ message: "Missing refresh token" });

  let payload: JwtPayload;

  try {
    payload = jwt.verify(
      token,
      process.env.REFRESH_SECRET as string
    ) as JwtPayload;
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  const userId = payload.id as number;

  //validate against db
  const tokens = await prisma.refreshToken.findMany({
    where: { userId, revokedAt: null },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const matched = await (async () => {
    for (const t of tokens) {
      if (await bcrypt.compare(token, t.tokenHash)) return t;
    }
    return null;
  })();

  if (!matched || matched.createdAt < new Date()) {
    return res
      .status(401)
      .json({ message: "Refresh token not recognized or expired" });
  }

  //rotate: revoke old, issue new
  await prisma.refreshToken.update({
    where: { id: matched.id },
    data: { revokedAt: new Date() },
  });

  const newAccess = signAccessToken({ id: userId });
  const newRefresh = signRefreshToken({ id: userId });
  const newHash = await bcrypt.hash(newRefresh, 10);

  await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash: newHash,
      expiresAt: new Date(Date.now() + REFRESH_MAX_AGE_MS),
    },
  });

  res.cookie("refresh_token", newRefresh, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: REFRESH_MAX_AGE_MS,
    path: "/",
  });

  return res.json({ newAccess });
};

//Logout
export const logout = async (req: Request, res: Response) => {
  const token = req.cookies?.["refresh_token"];
  if (token) {
    try {
      const payload = jwt.verify(
        token,
        process.env.REFRESH_SECRET as string
      ) as JwtPayload;
      const tokens = await prisma.refreshToken.findMany({
        where: { userId: payload.id, revokedAt: null },
      });

      for (const t of tokens) {
        if (await bcrypt.compare(token, t.tokenHash)) {
          await prisma.refreshToken.update({
            where: { id: t.id },
            data: { revokedAt: new Date() },
          });
          break;
        }
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  res.clearCookie("refresh_token", { path: "/" });
  return res.json({ message: "Logged Out" });
};

//Update profile
export const userUpdate = async (req: Request, res: Response) => {
  const userId = req.userId!;
  const body = z
    .object({
      username: z.string().min(1).optional(),
      password: z.string().min(6).optional(),
    })
    .safeParse(req.body);

  if (!body.success) {
    return res
      .status(400)
      .json({ message: "Invalid input", error: body.error });
  }

  const data: { username?: string; password?: string } = {};
  if (body.data.username) data.username = body.data.username.trim();
  if (body.data.password) data.password = body.data.password.trim();

  if (Object.keys(data).length) {
    return res.status(400).json({ message: "Nothing to update" });
  }

  try {
    await prisma.user.update({ where: { id: userId }, data });
    return res.json({ message: "Updated successfully" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
