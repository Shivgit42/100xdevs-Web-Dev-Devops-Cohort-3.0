/*
You have to create a middleware for rate limiting a users request based on their username passed in the header

You have been given an express server which has a few endpoints.

    Your task is to create a global middleware (app.use) which will rate limit the requests from a user to only 5 request per second
    - If a user sends more than 5 requests in a single second, the server should block them with a 404.
    - User will be sending in their user id in the header as 'user-id'
    - You have been given a numberOfRequestsForUser object to start off with which clears every one second
*/

const express = require("express");
const app = express();

// Object to track user request counts
let numberOfRequestsForUser = {};

// Reset counts every second
setInterval(() => {
  numberOfRequestsForUser = {};
}, 1000);

// Rate limit middleware
app.use(function (req, res, next) {
  const userId = req.headers["user-id"];

  // Handle missing user-id
  if (!userId) {
    return res.status(400).send("Missing user-id header");
  }

  // Initialize or increment user's request count
  if (!numberOfRequestsForUser[userId]) {
    numberOfRequestsForUser[userId] = 1;
  } else {
    numberOfRequestsForUser[userId]++;
  }

  // Block if request count exceeds 5 per second
  if (numberOfRequestsForUser[userId] > 5) {
    return res.status(404).send("No Entry");
  }

  // Proceed if under the limit
  next();
});

// Routes
app.get("/user", (req, res) => {
  res.status(200).json({ name: "Shivam" });
});

app.post("/user", (req, res) => {
  res.status(200).json({ msg: "created dummy user" });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
