const bcrypt = require("bcrypt");
const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { z } = require("zod");

async function connectToMongoDB() {
  await mongoose.connect(
    "mongodb+srv://admin:admin123123@cluster0.kqys6qe.mongodb.net/playing-w-passwords"
  );
}

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(6).max(30),
    name: z.string().min(3).max(100),
  });

  const parsedData = requiredBody.safeParse(req.body);

  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: "Incorrect format", error: parsedData.error });
  }

  const { email, password, name } = req.body;

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

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email,
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET
    );

    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

app.post("/todo", auth, async (req, res) => {
  const userId = req.userId;

  const { title, done } = req.body;

  await TodoModel.create({
    title,
    done,
    userId,
  });

  res.json({
    message: "Todo created successfully",
  });
});

app.get("/todos", auth, async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({
      message: "UserId is not found",
    });
  }

  const todos = await TodoModel.find({
    userId,
  });

  res.json({
    todos,
  });
});

const port = 3000;
async function startServer() {
  await connectToMongoDB();
  console.log("✅ Connected to MongoDB");

  app.listen(port, () => console.log(`Server is listening to port ${port}`));
}

startServer();
