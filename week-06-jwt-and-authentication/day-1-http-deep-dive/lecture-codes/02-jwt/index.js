const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomshivam";

app.use(express.json());

const users = [];

// should return a random long string

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Username and password are required");
  }

  username.trim().toLowerCase();
  password.trim();

  if (username.length < 3 && password.length < 6) {
    res.status(400).send("Username must be at least 3 characters, password 6");
  }

  const exists = users.find((u) => u.username === username);
  if (exists) {
    res.status(400).send("You are already signed in");
  }

  users.push({
    username: username,
    password: password,
  });
  res.json({
    message: "You are successfully signed up",
  });
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(403).send("Please give your valid credentials");
  }
  const token = jwt.sign(
    {
      username: username,
    },
    JWT_SECRET
  );

  // user.token = token;
  res.send({
    token,
  });
  console.log(users);
});

//Authenticated endpoint
app.get("/me", (req, res) => {
  const token = req.headers.token;
  const decodedInformation = jwt.verify(token, JWT_SECRET);
  const username = decodedInformation.username;

  const user = users.find((u) => u.username === username);
  if (!user) {
    res.send(403).send({
      message: "You have not signed in or token is invalid",
    });
  }

  res.send({
    username: user.username,
    password: user.password,
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
