const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  res.json({
    message: "signup endpoint",
  });
});

userRouter.post("/signin", async (req, res) => {
  res.json({
    message: "signin endpoint",
  });
});

userRouter.get("/purchases", async (req, res) => {
  res.json({
    message: "purchase endpoint",
  });
});

module.exports = {
  userRouter,
};
