const { Router } = require("express");
const userController = require("../controllers/userController");
const { userMiddleware } = require("../middleware/userMiddleware");
const userRouter = Router();

//user signup route
userRouter.post("/signup", userController.userSignup);

//user signin route
userRouter.post("/signin", userController.userSignin);

//user signout route
userRouter.post("/signout", userController.userSignout);

//get user purchase route
userRouter.get("/purchases", userMiddleware, userController.getUserPurchases);

module.exports = {
  userRouter,
};
