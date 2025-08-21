import express, { json } from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";

const app = express();

app.post("/signup", (req, res) => {});

app.post("/signin", (req, res) => {
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
  res.json({ roomId: "113" });
});

app.listen(3001);
