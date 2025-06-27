const zod = require("zod");
const bcrypt = require("bcrypt");
const { userModel, purchaseModel, courseModel } = require("../db");

//user signup
async function userSignup(req, res) {
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
    await userModel.create({
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
        message: "User already exists",
      });
    }
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

//user signin
async function userSignin(req, res) {
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
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(403).json({
      message: "Incorrect Credentials!",
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    req.session.userId = user._id; // Store userId in session

    res.status(200).json({
      message: "Signin Successful!",
    });
  } else {
    res.status(403).json({
      message: "Invalid Credentials!",
    });
  }
}

// user signout
function userSignout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to sign out",
      });
    }
    res.status(200).json({
      message: "Signout Successful!",
    });
  });
}

//get user purchase
async function getUserPurchases(req, res) {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  const purchases = await purchaseModel.find({
    userId,
  });

  const courseData = await courseModel.find({
    _id: { $in: purchases.map((purchase) => purchase.courseId) },
  });

  res.json({
    purchases,
    courseData,
  });
}

module.exports = {
  userSignup,
  userSignin,
  userSignout,
  getUserPurchases,
};
