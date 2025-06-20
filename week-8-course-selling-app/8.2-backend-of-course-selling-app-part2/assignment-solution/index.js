const express = require("express");
const { default: mongoose } = require("mongoose");
const {
  adminSessionMiddleware,
} = require("./middleware/adminSessionMiddleware");
const { userSessionMiddleware } = require("./middleware/userSessionMiddleware");

const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { courseRouter } = require("./routes/course");

const app = express();

app.use(express.json());

app.use("/api/v1/user", userSessionMiddleware, userRouter);
app.use(".api/v1/admin", adminSessionMiddleware, adminRouter);
app.use("/api/v1/course", courseRouter);

const port = process.env.PORT || 3000;
async function startServer() {
  {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("✅ Connected to database");
      app.listen(port, () =>
        console.log(`Server is listening to port ${port}`)
      );
    } catch (error) {
      console.error("Failed to connnect to the database", error);
    }
  }
}

startServer();
