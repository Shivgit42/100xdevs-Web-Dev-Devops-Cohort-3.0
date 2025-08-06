// Write a function getUser that lets you fetch data from the database given a email as input.

import { Client } from "pg";
import { config } from "dotenv";
config();

async function getUser(email: string) {
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });

  try {
    await client.connect();
    const query = "select * from users where email = $1";
    const values = [email];
    const res = await client.query(query, values);

    if (res.rows.length > 0) {
      console.log("User found", res.rows[0]);
      return res.rows[0];
    } else {
      console.log("No user found with given email");
      return null;
    }
  } catch (e) {
    console.error("Error while fetching user data", e);
    throw e;
  } finally {
    await client.end();
  }
}

getUser("intndn");
