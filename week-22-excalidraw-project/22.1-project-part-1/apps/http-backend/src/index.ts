import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import {
  SignUpSchema,
  SignInSchema,
  CreateRoomSchema,
} from "@repo/common/types";

const app = express();

app.post("/signup", (req, res) => {
  const body = SignUpSchema.safeParse(req.body);

  if (!body.success) {
    return res.json({ message: "Invalid input" });
  }

  res.json({
    userId: "123",
  });
});

app.post("/signin", (req, res) => {
  const body = SignInSchema.safeParse(req.body);

  if (!body.success) {
    return res.json({ message: "Invalid input" });
  }
  const userId = 1;

  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET!
  );

  res.json({
    token,
  });
});

app.post("/room", middleware, (req, res) => {
  const body = CreateRoomSchema.safeParse(req.body);

  if (!body.success) {
    return res.json({ message: "Invalid input" });
  }
  res.json({ roomId: "113" });
});

app.listen(3001);
