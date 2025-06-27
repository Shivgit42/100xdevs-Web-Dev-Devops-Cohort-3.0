const { Router } = require("express");
const courseRouter = Router();
const { z } = require("zod");
const { CourseModel } = require("../db");

//route handler to create a course
courseRouter.post("/create", async (req, res) => {
  const courseBodySchema = z.object({
    title: z.string().min(3).max(100),
    descripton: z.string().min(1),
    price: z.number(),
    imageUrl: z.string(),
  });

  const parsedData = courseBodySchema.safeParse(req.body);

  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: "Incorrect format", erorr: parsedData.error });
  }
  const { title, description, price, imageUrl } = parsedData.data;

  try {
    await CourseModel.create({
      title,
      description,
      price,
      imageUrl,
    });

    res.json({
      message: "Course created",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while signing up", error: err.message });
  }
});

courseRouter.post("/purchase", async (req, res) => {});

courseRouter.get("/preview", async (req, res) => {});

module.exports = {
  courseRouter,
};
