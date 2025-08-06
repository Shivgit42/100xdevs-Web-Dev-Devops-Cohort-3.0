import { Client } from "pg";
import { config } from "dotenv";
config();

const client = new Client({
  connectionString: process.env.CONNECTION_STRING,
});

async function initializeDB() {
  try {
    await client.connect();

    await client.query(`
      create table if not exists sql_string (
      id serial primary key,
      username varchar(50) unique not null,
      email varchar(255) unique not null,
      password varchar(255) not null,
      created_at timestamp with time zone default current_timestamp
      )
      `);
    console.log("table created successfully");
  } catch (err) {
    console.error("error during the insertion", err);
  }
}

interface InsertProps {
  username: string;
  email: string;
  password: string;
}

async function insertData({ username, email, password }: InsertProps) {
  try {
    const insertQuery =
      "insert into sql_string (username, email, password) values ($1, $2, $3)";
    const values = [username, email, password];
    const res = await client.query(insertQuery, values);
    console.log("insertion successfull", res);
  } catch (err) {
    console.error("error during the insertion", err);
  }
}

initializeDB()
  .then(() =>
    insertData({
      username: "ding",
      email: "ding@gmail.com",
      password: "njnasd",
    })
  )
  .catch(console.error)
  .finally(() => client.end());
