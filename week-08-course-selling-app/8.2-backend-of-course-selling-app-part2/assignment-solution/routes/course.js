const { Router } = require("express");
const {
  userSessionMiddleware,
} = require("../middleware/userSessionMiddleware");
const { userMiddleware } = require("../middleware/userMiddleware");
const courseController = require("../controllers/courseController");

const courseRouter = Router();

//route handler to purchase a course for authenticated course
courseRouter.post(
  "/purchase",
  userSessionMiddleware,
  userMiddleware,
  courseController.purchaseCourse
);

courseRouter.get("/preview", courseController.previewCourses);

module.exports = { courseRouter };
