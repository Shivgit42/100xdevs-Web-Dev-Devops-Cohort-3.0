import { Client } from "pg";
import express from "express";
import { config } from "dotenv";
config();

const app = express();
app.use(express.json());

const client = new Client({
  connectionString: process.env.CONNECTION_STRING,
});

async function initializeDB() {
  try {
    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)
    `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS addresses (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    pincode VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)
    `);
  } catch (e) {
    console.error(" Failed to initialize database:", e);
  }
}

app.post("/signup", async (req, res) => {
  const { username, email, password, city, country, street, pincode } =
    req.body;

  try {
    const userInsertQuery =
      "insert into users (username, email, password) values ($1, $2, $3) returning id";

    const addressesInsertQuery =
      "insert into addresses (city, country, street, pincode, userId) values ($1, $2, $3, $4, $5)";

    await client.query("begin");

    const response = await client.query(userInsertQuery, [
      username,
      email,
      password,
    ]);

    const userId = response.rows[0].id;

    // await new Promise((resolve) => setTimeout(resolve, 100 * 1000));

    await client.query(addressesInsertQuery, [
      city,
      country,
      street,
      pincode,
      userId,
    ]);

    await client.query("commit");

    res.json({
      message: "you have signed up successfully!",
    });
  } catch (e) {
    await client.query("rollback");
    console.error("error while inserting", e);
  } finally {
    await client.end();
  }
});

initializeDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
});
