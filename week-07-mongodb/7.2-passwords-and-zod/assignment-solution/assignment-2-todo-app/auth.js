const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing or malformed" });
  }

  try {
    const verifiedData = jwt.verify(token, process.env.JWT_SECRET);

    if (verifiedData) {
      req.userId = verifiedData.id;
      next();
    } else {
      res.status(403).json({
        message: "Invalid token",
      });
    }
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = {
  auth,
};
