const jwt = require("jsonwebtoken");
require("dotenv").config();

function adminAuth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token missing or malformed" });
  }

  try {
    const verifiedData = jwt.verify(token, process.env.JWT_SECRET);

    if (verifiedData) {
      req.adminId = verifiedData.id;
      next();
    } else {
      res.status(403).json({
        message: "Invalid token",
      });
    }
  } catch (err) {
    return res
      .status(403)
      .json({ message: "error while authorizing", error: err.message });
  }
}

module.exports = {
  adminAuth,
};
