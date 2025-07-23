// For example, the following code makes sure that the user is sending the right inputs to update their profile information

import express from "express";
import z from "zod";

const app = express();

const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email format" }),
  age: z
    .number()
    .min(18, { message: "You must be at least 18 years old" })
    .optional(),
});

export type FinalUserSchema = z.infer<typeof userProfileSchema>;

app.put("/user", (req, res) => {
  const { success } = userProfileSchema.safeParse(req.body);
  const updatedBody: FinalUserSchema = req.body;

  if (!success) {
    res.status(411).json({});
    return;
  }

  res.json({
    messgae: "User updated",
  });
});

app.listen(3000);
