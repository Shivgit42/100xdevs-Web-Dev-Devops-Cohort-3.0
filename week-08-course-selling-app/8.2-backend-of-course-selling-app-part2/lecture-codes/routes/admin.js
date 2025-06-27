const { Router } = require("express");
const { AdminModel, CourseModel } = require("../db");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { adminMiddleware } = require("../middleware/admin");
const adminRouter = Router();
require("dotenv").config();

adminRouter.post("/signup", async (req, res) => {
  // Validate the request body data using zod schema (email, password, firstName, lastName must be valid)
  const requireBody = z.object({
    email: z.string().email().min(5),
    password: z.string().min(5),
    firstName: z.string().min(3),
    lastName: z.string().min(3),
  });

  // Parse and validate the request body data
  const parseData = requireBody.safeParse(req.body);

  // If the data format is incorrect, send an error message to the client
  if (!parseData.success) {
    return res.json({
      message: "Incorrect data format",
      error: parseData.error,
    });
  }

  // Get email, password, firstName, and lastName from the request body
  const { email, password, firstName, lastName } = req.body;

  // Hash the admin's password using bcrypt with a salt of 10
  const hashedPassword = await bcrypt.hash(password, 10);

  // Try to create a new admin in the database
  try {
    // Create a new admin with the given email, hashed password, firstName, and lastName
    await AdminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
  } catch (error) {
    // If the admin already exists, send an error message to the client
    return res.status(400).json({
      message: "You are already signup!",
    });
  }

  // Respond with a success message if the admin is created successfully
  res.status(201).json({
    message: "Signup successful!",
  });
});

adminRouter.post("/signin", async (req, res) => {
  // Validate the request body data using zod schema (email, password must be valid)
  const requireBody = z.object({
    email: z.string().email(), // Email must be a valid format
    password: z.string().min(6), // Password must be at least 6 characters
  });

  // Parse and validate the request body data
  const parseData = requireBody.safeParse(req.body);

  // If the data format is incorrect, send an error message to the client
  if (!parseData.success) {
    return res.json({
      message: "Incorrect data format",
      error: parseData.error,
    });
  }

  // Get email and password from the request body
  const { email, password } = req.body;

  // Find the admin with the given email
  const admin = await AdminModel.findOne({
    email: email,
  });

  // If the admin is not found, send an error message to the client
  if (!admin) {
    return res.status(403).json({
      message: "Invalid Credentials!",
    });
  }

  // Compare the password with the hashed password using the bcrypt.compare() method
  const passwordMatch = await bcrypt.compare(password, admin.password); // Note: Added 'await' for proper async handling

  // If password matches, generate a JWT token and return it
  if (passwordMatch) {
    // Create a JWT token with the admin's id and the secret key
    const token = jwt.sign({ id: admin._id }, process.env.ADMIN_JWT_SECRET);

    // Send the token to the client
    res.status(200).json({
      token: token,
    });
  } else {
    // If the password does not match, send an error message to the client
    res.status(403).json({
      message: "Invalid Credentials!",
    });
  }
});

//admin route for creating a course
adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const requireBody = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    imageUrl: z.string().url(),
    price: z.number().positive(),
  });

  const parseDataWithSuccess = requireBody.safeParse(req.body);

  if (!parseDataWithSuccess.success) {
    return res.json({
      message: "Incorrect data format",
      error: parseDataWithSuccess.error,
    });
  }

  const { title, description, imageUrl, price } = parseDataWithSuccess.data;

  const course = await CourseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorId: adminId,
  });

  res.status(201).json({
    message: "Course created!",
    courseId: course._id,
  });
});

//admin route to update content of an existing course
adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const requireBody = z.object({
    courseId: z.string().min(5),
    title: z.string().min(3),
    description: z.string().min(10).optional(),
    imageUrl: z.string().url().optional(),
    price: z.number().positive().optional(),
  });

  const parseDataWithSuccess = requireBody.safeParse(req.body);

  if (!parseDataWithSuccess.success) {
    return res.json({
      message: "Incorrect data format",
      error: parseDataWithSuccess.error,
    });
  }

  const { courseId, title, description, imageUrl, price } =
    parseDataWithSuccess.data;

  const course = await CourseModel.findOne({
    _id: courseId,
    creatorId: adminId,
  });

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  await CourseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title: title || course.title,
      description: description || course.description,
      price: price || course.price,
      imageUrl: imageUrl || course.imageUrl,
    }
  );

  res.json({
    message: "Course updated",
  });
});

//admin route to get all courses
adminRouter.post("/course/all", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const courses = await CourseModel.find({
    creatorId: adminId,
  });

  res.json({
    message: "All courses",
    courses: courses,
  });
});

//admin route to delete the existing course
adminRouter.delete("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const requireBody = z.object({
    courseId: z.string(),
  });

  const parseDataWithSuccess = requireBody.safeParse(req.body);

  // If the data format is incorrect, send an error message to the client
  if (!parseDataWithSuccess.success) {
    return res.json({
      message: "Incorrect data format",
      error: parseDataWithSuccess.error,
    });
  }

  const { courseId } = req.body;

  const course = await CourseModel.findOne({
    _id: courseId,
  });

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  await CourseModel.deleteOne({
    _id: courseId,
    creatorId: adminId,
  });

  res.json({
    message: "Course deleted",
  });
});

module.exports = {
  adminRouter,
};
