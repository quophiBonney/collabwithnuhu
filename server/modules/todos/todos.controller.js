import todosModel from "./todo.model.js";

export const createTodo = async (req, res) => {
  try {
    const { description, category, time, date, important } = req.body;
    if (!description || !category || !time || !date) {
      return res.status(401).json({ message: "All fields are requred" });
    }
    const duplicateTodo = await todosModel.findOne({ description });
    if (duplicateTodo) {
      return res.status(403).json({ message: "Todo already exist" });
    }
    const newTodo = {
      description,
      category,
      time,
      date,
      important,
    };
    const saveTodo = await todosModel.create(newTodo);
    if (saveTodo) {
      return res.status(201).json({ message: "Todo created successfully" });
    }
  } catch (error) {
    console.log("Error message:", error);
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const allTodos = await todosModel.find();
    if (allTodos) {
      return res.status(200).json({ data: allTodos });
    }
  } catch (err) {
    console.log("Error message", err);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { description, date, time, category, important } = req.body;
    const { id } = req.params;

    if (!description || !category || !time || !date) {
      return res
        .status(401)
        .json({ message: "At least one field is required" });
    }

    const todoExist = await todosModel.findById(id);
    if (!todoExist) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const updatedTodo = await todosModel.findByIdAndUpdate(
      id,
      { description, category, date, time, important },
      { new: true, runValidators: true },
    );

    return res
      .status(200)
      .json({ message: "Todo updated successfully", data: updatedTodo });
  } catch (error) {
    console.log("Error message:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todoData = await todosModel.findByIdAndDelete(id);

    if (!todoData) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log("Error message:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
