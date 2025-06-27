const { Router } = require("express");
const userRouter = Router();
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel, PurchaseModel, CourseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");
require("dotenv").config();

userRouter.post("/signup", async (req, res) => {
  const requireBody = z.object({
    email: z.string().email().min(5),
    password: z.string().min(5),
    firstName: z.string().min(3),
    lastName: z.string().min(3),
  });

  // Parse and validate the incoming request body data
  const parseData = requireBody.safeParse(req.body);

  // If validation fails, return a 400 error with the validation error details
  if (!parseData.success) {
    return res.json({
      message: "Incorrect data format",
      error: parseData.error, // Provide details about the validation error
    });
  }

  // Extract validated email, password, firstName, and lastName from the request body
  const { email, password, firstName, lastName } = req.body;

  // Hash the user's password using bcrypt with a salt rounds of 10
  const hashedPassword = await bcrypt.hash(password, 10);

  // Try to create a new user in the database
  try {
    // Create a new user entry with the provided email, hashed password, firstName, and lastName
    await UserModel.create({
      email,
      password: hashedPassword, // Store the hashed password instead of plain text
      firstName,
      lastName,
    });
  } catch (error) {
    // If there is an error during user creation, return a 400 error message
    return res.status(400).json({
      message: "You are already signup", // Provide a message indicating signup failure
    });
  }

  // Send a 201 success response back to the client indicating successful signup
  res.status(201).json({
    message: "Signup Successful!", // Success message upon successful signup
  });
});

userRouter.post("/signin", async (req, res) => {
  // Define the schema for validating the request body data using zod
  const requireBody = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  // Parse and validate the incoming request body data
  const parseData = requireBody.safeParse(req.body);

  // If validation fails, return a 400 error with the validation error details
  if (!parseData.success) {
    return res.json({
      message: "Incorrect data format",
      error: parseData.error, // Provide details about the validation error
    });
  }

  // Extract validated email and password from the request body
  const { email, password } = req.body;

  // Attempt to find the user with the provided email in the database
  const user = await UserModel.findOne({
    email: email, // Querying the user by email
  });

  // If the user is not found, return a 403 error indicating incorrect credentials
  if (!user) {
    return res.status(403).json({
      message: "Incorrect Credentials!", // Error message for invalid login attempt
    });
  }

  // Compare the provided password with the stored hashed password using bcrypt
  const passwordMatch = await bcrypt.compare(password, user.password);

  // If the password matches, create a JWT token and send it to the client
  if (passwordMatch) {
    // Create a JWT token containing the user ID, signed with the user JWT secret
    const token = jwt.sign({ id: user._id }, process.env.USER_JWT_SECRET);

    // Send the generated token back to the client
    res.status(200).json({
      token: token, // Include the token in the response
    });
  } else {
    // If the password does not match, return a 403 error indicating invalid credentials
    res.status(403).json({
      message: "Invalid Credentials!", // Error message for failed password comparison
    });
  }
});

//route handler to buy the course
userRouter.get("/purchases", userMiddleware, async (req, res) => {
  const userId = req.userId;

  const purchases = await PurchaseModel.find({
    userId,
  });

  if (!purchases) {
    return res.status(404).json({
      message: "No purchases found", // Error message for no purchases found
    });
  }

  const courseContent = await CourseModel.find({
    _id: { $in: purchases.map((purchase) => purchase.courseId) },
  });

  res.json({
    purchases,
    courseContent,
  });
});

//route handler to see the all courses
userRouter.get("/courses", async (req, res) => {
  res.json({
    message: "purchase endpoint",
  });
});

module.exports = {
  userRouter,
};
