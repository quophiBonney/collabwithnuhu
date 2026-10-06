import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "in-progress", "not-started"],
    default: "not-started",
  },
});

const todosModel = mongoose.model("todos", todoSchema);

export default todosModel;
