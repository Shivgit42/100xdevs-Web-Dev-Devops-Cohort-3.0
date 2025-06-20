const bcrypt = require("bcrypt");
const zod = require("zod");
const { adminModel, courseModel } = require("../db");

// admin signup
async function adminSignup(req, res) {
  const requiredBodySchema = zod.object({
    email: zod.string().email().min(3).max(100),
    password: zod
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,30}$/),
    firstName: zod.string().min(2).max(100),
    lastName: zod.string().min(2).max(100),
  });

  const parsedData = requiredBodySchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      message: "Incorrect data format",
      error: parsedData.error,
    });
  }

  const { email, password, firstName, lastName } = parsedData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await adminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    res.status(201).json({
      message: "Signup Successful!",
    });
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error
      return res.status(400).json({
        message: "Admin already exists",
      });
    }
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

// Admin Signin
async function adminSignin(req, res) {
  const requiredBodySchema = zod.object({
    email: zod.string().min(3).max(100).email(),
    password: zod
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,30}$/),
  });

  const parsedData = requiredBodySchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      message: "Incorrect data format",
      error: parsedData.error,
    });
  }

  const { email, password } = parsedData.data;
  const admin = await adminModel.findOne({ email });

  if (!admin) {
    return res.status(403).json({
      message: "Incorrect Credentials!",
    });
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (passwordMatch) {
    req.session.adminId = admin._id; // Store userId in session

    res.status(200).json({
      message: "Signin Successful!",
    });
  } else {
    res.status(403).json({
      message: "Invalid Credentials!",
    });
  }
}

// Create Course
async function createCourse(req, res) {
  const requiredBodySchema = zod.object({
    title: zod.string().min(3),
    description: zod.string().min(10),
    imageUrl: zod.string().url(),
    price: zod.number().positive(),
  });

  const parsedData = requiredBodySchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.json({
      message: "Incorrect data format",
      error: parsedData.error,
    });
  }

  const { title, description, imageUrl, price } = parsedData.data;
  const course = await courseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorId: req.adminId,
  });

  res.status(201).json({ message: "Course created!", courseId: course._id });
}

// Update Course
async function updateCourse(req, res) {
  const requiredBodySchema = zod.object({
    courseId: zod.string().min(5),
    title: zod.string().min(3).optional(),
    description: zod.string().min(5).optional(),
    imageUrl: zod.string().url().optional(),
    price: zod.number().positive().optional(),
  });

  const parsedData = requiredBodySchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.json({
      message: "Incorrect data format",
      error: parsedData.error,
    });
  }

  const { courseId, title, description, imageUrl, price } = parsedData.data;
  const course = await courseModel.findOne({
    _id: courseId,
    creatorId: req.adminId,
  });

  if (!course) {
    return res.status(404).json({ message: "Course not found!" });
  }

  await courseModel.updateOne(
    { _id: courseId, creatorId: req.adminId },
    {
      title: title || course.title,
      description: description || course.description,
      imageUrl: imageUrl || course.imageUrl,
      price: price || course.price,
    }
  );

  res.status(200).json({ message: "Course updated!" });
}

// Delete Course
async function deleteCourse(req, res) {
  const requiredBodySchema = zod.object({
    courseId: zod.string().min(5),
  });

  const parsedData = requiredBodySchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.json({
      message: "Incorrect data format",
      error: parsedData.error,
    });
  }

  const { courseId } = req.body;
  const course = await courseModel.findOne({
    _id: courseId,
    creatorId: req.adminId,
  });

  if (!course) {
    return res.status(404).json({ message: "Course not found!" });
  }

  await courseModel.deleteOne({ _id: courseId, creatorId: req.adminId });
  res.status(200).json({ message: "Course deleted!" });
}

// Get All Courses
async function getAllCourses(req, res) {
  const courses = await courseModel.find({ creatorId: req.adminId });
  res.status(200).json({ courses });
}

module.exports = {
  adminSignup,
  adminSignin,
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
};
