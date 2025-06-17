const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret@123";

function auth(req, res, next) {
  const token = req.headers.authorization;

  const verifiedData = jwt.verify(token, JWT_SECRET);

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
  JWT_SECRET,
};
