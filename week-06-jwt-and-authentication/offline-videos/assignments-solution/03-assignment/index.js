/**
 * Assignment #3 - Write a function that takes a jwt as input and returns
 * true if the jwt can be VERIFIED. Return false otherewise
 */

const jwt = require("jsonwebtoken");

function verifyJwt(token) {
  try {
    jwt.verify(token, "secret");
    return true;
  } catch (error) {}
  return false;
}

console.log(verifyJwt(""));
