const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const token = req.headers.authorization;

  const verifiedData = jwt.verify(token, process.env.JWT_SECRET);

  if (verifiedData) {
    req.userId = verifiedData.id;
    next();
  } else {
    res.status(403).json({
      message: "Invalid token",
    });
  }
}

module.exports = {
  auth,
};
