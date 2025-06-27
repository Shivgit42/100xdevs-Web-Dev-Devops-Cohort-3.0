const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const path = require("path");
const JWT_SECRET = "randomfullstacktodo";

app.use(express.json());

let users = []; // storing the user info
let todos = []; // storing the todos

app.use(express.static(path.join(__dirname, "public")));

//signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(403)
      .json({ message: "Username and password are required" });
  }

  if (username.length < 3 || password.length < 6) {
    return res.status(400).json({
      message:
        "Username must be at least 3 character long, and password at least 6",
    });
  }

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  users.push({
    username,
    password,
  });

  res.json({
    message: "You have successfully signed up",
  });
});

// sign in
app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ message: "Username and password are required." });
  }

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign(
    {
      username,
    },
    JWT_SECRET
  );

  res.json({
    message: "Sign in successfull",
    token,
  });
});

//auth middleware
function auth(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.json({ message: "Token is missing!" });
  }
  try {
    const decodingToken = jwt.verify(token, JWT_SECRET);
    req.username = decodingToken.username;

    next();
  } catch (err) {
    console.error({ message: "Invalid token" });
  }
}

//route to get all the todos for authenticated user
app.get("/todos", auth, (req, res) => {
  const currentUser = req.username;

  const userTodos = todos.filter((todo) => todo.username === currentUser);

  res.json(userTodos);
});

//route to create a new todo
app.post("/todos", auth, (req, res) => {
  const currentUser = req.username;
  const { title } = req.body;

  if (!title) {
    return res.json({ message: "Title cannot be empty" });
  }

  const newTodo = {
    id: todos.length + 1,
    username: currentUser,
    title,
    done: false,
  };

  todos.push(newTodo);
  res.json({ message: "Todo created successfully", todo: newTodo });
});

//route to update todo with given id
app.put("/todos/:id", auth, (req, res) => {
  //extract the id
  const { id } = req.params;

  //extract the title
  const { title } = req.body;

  const currentUser = req.username;

  const todo = todos.find(
    (todo) => todo.id === parseInt(id) && todo.username === currentUser
  );

  if (!todo) {
    return res.json({ message: "todo not found" });
  }

  if (!title) {
    return res.json({ message: "title cannot be empty" });
  }

  todo.title = title;
  res.json({ message: "todo updated successfully", todo });
});

//route to mark todo with given id
app.put("/todos/:id/done", auth, (req, res) => {
  const { id } = req.params;

  const currentUser = req.username;

  const todo = todos.find(
    (todo) => todo.id === parseInt(id) && todo.username === currentUser
  );

  if (!todo) {
    return res.json({ message: "todo not found" });
  }

  todo.done = !todo.done;
  res.json({
    message: `todo marked as ${todo.done ? "done" : "undone"}`,
    todo,
  });
});

//route to delete todo with given id
app.delete("/todos/:id", auth, (req, res) => {
  const { id } = req.params;

  const currentUser = req.username;

  const index = todos.findIndex(
    (todo) => todo.id === parseInt(id) && todo.username === currentUser
  );
  if (index === -1) {
    return res.json({ message: "Todo not found or unauthorized" });
  }
  todos.splice(index, 1);
  res.json({
    message: "todo deleted successfully",
    todos: todos.filter((todo) => todo.username === currentUser),
  });
});

const port = 3000;
app.listen(port, () => console.log(`Server is runnig on port ${port}`));
