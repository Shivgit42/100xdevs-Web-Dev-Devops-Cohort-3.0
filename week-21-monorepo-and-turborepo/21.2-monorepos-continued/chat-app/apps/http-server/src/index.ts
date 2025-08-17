import express from "express";

const app = express();

app.get("/signup", (req, res) => {
  res.send("Hello there");
});

app.get("/signin", (req, res) => {
  res.send("Hello there");
});

app.get("/chat", (req, res) => {
  res.send("Hello there");
});

app.listen(3001);
