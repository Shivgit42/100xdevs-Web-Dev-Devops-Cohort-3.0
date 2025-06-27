/**
 * Assignment #2 - Add more endpoints (mark todo as done) for todo-app.
 *      - Optional: Add timestamp at which todo was created/the time it needs to be done
 */

const bcrypt = require("bcrypt");
const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { z } = require("zod");
require("dotenv").config();

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (e) {
    console.error("❌ Error connecting to MongoDB:", e.message);
    process.exit(1); // Exit if DB fails
  }
}

const app = express();
app.use(express.json());

//signup route handler
app.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,30}$/),
    name: z.string().min(3).max(100),
  });

  const parsedData = requiredBody.safeParse(req.body);

  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: "Incorrect format", error: parsedData.error });
  }

  const { email, password, name } = parsedData.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    await UserModel.create({
      email,
      password: hashedPassword,
      name,
    });
    res.json({
      message: "You are successfully signed up",
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error while signing up", error: e.message });
  }
});

//sgnin route
app.post("/signin", async (req, res) => {
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

app.post("/todo", auth, async (req, res) => {
  const userId = req.userId;

  const todoSchema = z.object({
    title: z.string().min(1),
    done: z.boolean().optional(),
    dueDate: z.string().optional(),
  });

  const parsedData = todoSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: "Incorrect format", error: parsedData.error });
  }

  let { title, done = false, dueDate } = parsedData.data;

  if (!dueDate) {
    dueDate = new Date().toISOString();
  }

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
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error while creating a todo", error: e.message });
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
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error while fetching todos", error: e.message });
  }
});

//route handler for updating a todo and done status
app.put("/todo/:id", auth, async (req, res) => {
  const userId = req.userId;

  const todoId = req.params.id;

  const { title, done } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title cannot be empty" });
  }

  try {
    const todo = await TodoModel.findOne({
      _id: todoId,
      userId,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.title = title;
    todo.done = done !== undefined ? done : todo.done;

    await todo.save();

    res.json({ message: "Todo updated successfully" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error while updating a todo", error: e.message });
  }
});

//delete todo
app.delete("/todo/:id", auth, async (req, res) => {
  const userId = req.userId;

  const todoId = req.params.id;

  try {
    const todo = await TodoModel.findOne({
      _id: todoId,
      userId,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await TodoModel.deleteOne({ _id: todoId, userId });

    res.json({ message: "Todo deleted" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error while deleting a todo", error: e.message });
  }
});

const port = process.env.PORT || 3000;
async function startServer() {
  await connectToMongoDB();

  app.listen(port, () => console.log(`Server is listening to port ${port}`));
}

startServer();
