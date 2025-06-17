const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "secret@123";

connectDB();

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://admin:admin123123@cluster0.kqys6qe.mongodb.net/todo-app-database22"
  );
}

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  await UserModel.create({
    email,
    password,
    name,
  });

  res.json({
    message: "You are successfully signed up",
  });
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email,
    password,
  });

  console.log(user);

  if (user) {
    console.log({
      id: user._id,
    });
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

function auth(req, res, next) {
  const token = req.headers.authorization;

  const verifiedData = jwt.verify(token, JWT_SECRET);

  if (verifiedData) {
    req.userId = verifiedData.id;
    next();
  } else {
    res.status(403).json({
      message: "Invalid token",
    });
  }
}

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
app.listen(port, () => console.log(`Server is listening to port ${port}`));
