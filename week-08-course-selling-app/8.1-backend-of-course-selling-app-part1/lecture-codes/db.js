const { Schema, default: mongoose } = require("mongoose");
const ObjectId = Schema.ObjectId;

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
});

const Admin = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
});

const Course = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: String,
  creatorId: { type: ObjectId, ref: "admin" },
});

const Purchase = new Schema({
  courseId: { type: ObjectId, ref: "course" },
  userId: { type: ObjectId, ref: "user" },
});

const UserModel = mongoose.model("user", User);
const AdminModel = mongoose.model("admin", Admin);
const CourseModel = mongoose.model("course", Course);
const PurchaseModel = mongoose.model("purchase", Purchase);

module.exports = {
  UserModel,
  AdminModel,
  CourseModel,
  PurchaseModel,
};
