import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  time: {
    type: String,
  },
  date: {
    type: String,
  },
  important: {
    type: String,
    enum: ["yes", "no"],
    default: "no",
  },
});

const todosModel = mongoose.model("todos", todoSchema);

export default todosModel;
