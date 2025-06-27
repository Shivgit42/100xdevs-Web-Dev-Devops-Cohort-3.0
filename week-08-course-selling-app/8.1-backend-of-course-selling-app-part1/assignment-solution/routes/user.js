const { Router } = require("express");
const { UserModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const userAuth = require("../userAuth");
require("dotenv").config();

const userRouter = Router();

//route handler to signup
userRouter.post("/signup", async (req, res) => {
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

    await UserModel.create({
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
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({
      email,
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          id: user._id.toString(),
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

//route handler to show all courses
userRouter.post("/courses", userAuth, async (req, res) => {});

//route handler for buying/purchasing a course
userRouter.post("/purchasing", async (req, res) => {});

// route handler to get all the purchased courses
userRouter.get("/purchases", async (req, res) => {});

module.exports = {
  userRouter,
};
