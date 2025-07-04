const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: String,
});

const Todo = new Schema(
  {
    title: String,
    done: Boolean,
    userId: { type: ObjectId, ref: "users" },
    dueDate: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);

module.exports = {
  UserModel,
  TodoModel,
};
