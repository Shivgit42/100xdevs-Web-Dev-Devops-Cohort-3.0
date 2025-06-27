const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomshivam";

app.use(express.json());

let users = [];

function logger(req, res, next) {
  console.log(`${req.method} request came`);
  next();
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//signup
app.post("/signup", logger, (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(403).send("Username and password are required");
  }

  if (username.length < 3 || password.length < 6) {
    return res
      .status(400)
      .send(
        "Username must be at least 3 character long, and password at least 6"
      );
  }

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(409).send("Username already exists");
  }

  users.push({
    username: username,
    password: password,
  });

  res.send({
    message: "You have successfully signed up",
  });
});

app.post("/signin", logger, (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).send("Invalid username or password");
  }

  const token = jwt.sign(
    {
      username: username,
    },
    JWT_SECRET
  );

  res.json({
    message: "Sign in sucessfull",
    token,
  });
});

function auth(req, res, next) {
  const token = req.headers.token;
  const decodingToken = jwt.verify(token, JWT_SECRET);

  if (decodingToken.username) {
    req.username = decodingToken.username;
    next();
  } else {
    res.json({
      message: "You are not logged in",
    });
  }
}

app.get("/me", logger, auth, (req, res) => {
  const foundUser = users.find((u) => u.username === req.username);

  if (!foundUser) {
    return res.status(409).send("Token is invalid");
  }

  res.json({
    username: foundUser.username,
    password: foundUser.password,
  });
});

const port = 3000;
app.listen(port, () => console.log(`Server is runnig on port ${port}`));
