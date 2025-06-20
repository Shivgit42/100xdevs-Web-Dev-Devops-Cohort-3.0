const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { PurchaseModel, CourseModel } = require("../db");

const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  const userId = req.userId;

  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({
      message: "Please provide a courseId",
    });
  }

  const existingPurchase = await PurchaseModel.findOne({
    courseId,
    userId,
  });

  if (existingPurchase) {
    return res.status(400).json({
      message: "You have already bought this course",
    });
  }

  await PurchaseModel.create({
    courseId,
    userId,
  });

  res.json({
    message: "You have successfully bought the course",
  });
});

//get all the courses, this doesn't really need authentication, every netizens should be able to see the courses
courseRouter.get("/preview", async (req, res) => {
  const courses = await CourseModel.find({});

  res.json({
    message: "All courses",
    courses: courses,
  });
});

module.exports = {
  courseRouter,
};
