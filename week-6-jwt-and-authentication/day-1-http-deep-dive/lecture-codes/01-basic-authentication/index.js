const express = require("express");
const app = express();

app.use(express.json());

const users = [];

// should return a random long string
function generateToken() {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let token = "";
  for (let i = 0; i < 32; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
}

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
  const token = generateToken();
  user.token = token;
  res.send({
    token,
  });
  console.log(users);
});

//Authenticated endpoint
app.get("/me", (req, res) => {
  const token = req.headers.token;
  const user = users.find((u) => u.token === token);
  if (!user) {
    res.send(403).send({
      message: "You have not signed in or token is invalid",
    });
  }
  const username = user.username;
  const password = user.password;
  res.send({
    username,
    password,
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
