const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");

adminRouter.post("/signup", async (req, res) => {
  res.json({
    message: "signup endpoint",
  });
});

adminRouter.post("/signin", async (req, res) => {
  res.json({
    message: "signin endpoint",
  });
});

adminRouter.post("/", (req, res) => {
  res.json({
    message: "course content endpoint",
  });
});

adminRouter.put("/", (req, res) => {
  res.json({
    message: "course update endpoint",
  });
});

adminRouter.post("/bulk", (req, res) => {
  res.json({
    message: "all courses endpoint",
  });
});

module.exports = {
  adminRouter,
};
