const { Router } = require("express");
const adminRouter = Router();
const { Ad, AdminModelminModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const userAuth = require("../userAuth");
require("dotenv").config();

//route handler for signup
adminRouter.post("/signup", async (req, res) => {
  const bodySchema = z.object({
    email: z.string().min(3).max(100).email(),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,30}$/),
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
  });

  const parsedData = bodySchema.safeParse(req.body);

  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: "Incorrect format", erorr: parsedData.error });
  }
  const { email, password, firstName, lastName } = parsedData.data;

  try {
    const hashedPassword = bcrypt.hash(password, 10);

    await AdminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.json({
      message: "Sign in successfull",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while signing up", error: err.message });
  }
});

//route handler for signin
adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({
      email,
    });

    if (user && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign(
        {
          id: admin._id.toString(),
        },
        process.env.JWT_SECRET
      );

      res.json({
        token,
      });
    } else {
      res.status(403).json({
        message: "Incorrect credentials",
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error while signing in", error: e.message });
  }
});

//
adminRouter.put("/add", (req, res) => {
  res.json({
    message: "add content to course",
  });
});

adminRouter.post("/create", (req, res) => {
  res.json({
    message: "new course created",
  });
});

adminRouter.delete("/delete", (req, res) => {
  res.json({
    message: "course deleted",
  });
});

module.exports = {
  adminRouter,
};
