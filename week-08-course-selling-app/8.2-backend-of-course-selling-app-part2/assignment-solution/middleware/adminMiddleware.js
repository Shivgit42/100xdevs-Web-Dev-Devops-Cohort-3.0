function adminMiddleware(req, res, next) {
  console.log("Session: ", req.session);

  if (req.session && req.session.adminId) {
    req.adminId = req.session.adminId;
    return next();
  }

  return res.status(401).json({
    message: "Unauthorized",
  });
}

module.exports = {
  adminMiddleware,
};
