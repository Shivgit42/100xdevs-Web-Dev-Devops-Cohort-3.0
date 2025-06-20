const jwt = require("jsonwebtoken");
require("dotenv").config();

function userMiddleware(req, res, next) {
  // Get the token from the request headers, which is expected to be sent in the authorization header
  const token = req.headers.authorization;

  // Use a try-catch block to handle any errors that may occur during token verification
  try {
    // Verify the token using the JWT User Password to check its validity
    const decoded = jwt.verify(token, process.env.USER_JWT_SECRET);

    // Set the userId in the request object from the decoded token for later use
    req.userId = decoded.id;

    // Call the next middleware in the stack to proceed with the request
    next();
  } catch (error) {
    // If the token is invalid or an error occurs during verification, send an error message to the client
    return res.status(403).json({
      message: "You are not Signed in!", // Inform the user that they are not authorized
    });
  }
}

// Export the userMiddleware function so that it can be used in other files
module.exports = {
  userMiddleware, // Exporting the middleware for use in routes
};
