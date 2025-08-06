import { Client } from "pg";
import express from "express";
import { config } from "dotenv";
config();

const app = express();
app.use(express.json());

const pgClient = new Client({
  connectionString: process.env.CONNECTION_STRING,
});

pgClient.connect();

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const insertQuery = `insert into users (username, email, password) values ($1, $2, $3)`;

  await pgClient.query(insertQuery, [username, email, password]);

  res.json({
    message: "You have signed up",
  });
});

app.listen(3000);

// const connect = async () => {
//   await pgClient.connect();
//   await pgClient.query("select * from users");

//   await pgClient.query("update users set username='mayank' where id='2' ");
// };

// connect();
