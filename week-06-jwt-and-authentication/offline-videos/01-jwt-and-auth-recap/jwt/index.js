const jwt = require("jsonwebtoken");

//decode, verify, generate

const value = {
  name: "shivam",
  accountNumber: 123123,
};

const token = jwt.sign(value, "secret");

//? my token, if you verify it, it will give your info - { name: 'shivam', accountNumber: 123123, iat: 1750000854 }
// const token = jwt.verify(
//   "my_token",
//   "secret"
// );

//? intruder token, if you try to verify it will throw an error - invalid signature
// const token = jwt.verify(
//   "intruder_token",
//   "secret"
// );

console.log(token);

// this token has been generated using this secret, and hence this token can only be verirfied using this secret
