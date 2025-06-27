/**
 * Assignment #2 - Write a function that takes a jwt as input and returns
 * true if the jwt can be DECODED (not verified). Return false otherwise
 */

const jwt = require("jsonwebtoken");

function decodeJwt(token) {
  const decoded = jwt.decode(token);
  if (decoded) {
    return true;
  } else {
    return false;
  }
}

console.log(decodeJwt("aicnaib"));
