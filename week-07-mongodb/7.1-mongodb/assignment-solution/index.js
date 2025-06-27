//? Improvements
// 1.Password is not hashed
// 2.A single crash (duplicate email) crashes the whole app
// 3.Add more endpoints (mark todo as done)
// 4.Add timestamp at which todo was created/the time it needs to be done by
// 5.Relationships in Mongo
// 6.Add validations to ensure email and password are correct format

const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../.env" });

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err.message);
    process.exit(1);
  }
}

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    //basic validation
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\w_]).{6,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters with one smallercase, one uppercase, and one special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      email,
      password: hashedPassword,
      name,
    });

    res.json({
      message: "You are successfully signed up",
    });
  } catch (err) {
    res.status(500).json({ message: "Error signing up", error: err.message });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({
      email,
    });

    console.log(user);

    if (user && bcrypt.compare(password, user.password)) {
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
  } catch (err) {
    res.status(500).json({ message: "Error signing in", error: err.message });
  }
});

app.post("/todo", auth, async (req, res) => {
  const userId = req.userId;

  const { title, done = false, dueDate } = req.body;

  try {
    await TodoModel.create({
      title,
      done,
      userId,
      dueDate,
    });

    res.json({
      message: "Todo created successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating todo", error: err.message });
  }
});

app.get("/todos", auth, async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({
      message: "UserId is not found",
    });
  }

  try {
    const todos = await TodoModel.find({
      userId,
    });

    res.json({
      todos,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching todos", error: err.message });
  }
});

app.put("/todo/:id/done", auth, async (req, res) => {
  const todoId = req.params.id;

  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      todoId,
      { done: true },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({
      message: "Todo marked as a done",
      todo: updatedTodo,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating todo", error: err.message });
  }
});

const port = process.env.PORT || 3000;

async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => console.log(`Server is listening to port ${port}`));
}

startServer();
