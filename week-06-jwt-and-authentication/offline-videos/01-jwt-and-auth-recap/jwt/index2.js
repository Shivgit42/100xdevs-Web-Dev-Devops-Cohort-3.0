//intruder
//! Let's say if someone gets your token that you have generated and try to verify it using your token, it will not verify even if they have your token and information because they do not have your secret key

const jwt = require("jsonwebtoken");

const contents = {
  name: "shivam",
  accountNumber: 123123,
  iat: 1750000854,
};

const token = jwt.sign(contents, "ajahja");
console.log(token);
