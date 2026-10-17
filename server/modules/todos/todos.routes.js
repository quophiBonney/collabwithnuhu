import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "./todos.controller.js";
const router = express.Router();

router.post("/todo", createTodo);
router.get("/todo", getAllTodos);
router.put("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);
export default router;
