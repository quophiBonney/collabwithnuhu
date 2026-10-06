import todosModel from "./todo.model.js";

export const createTodo = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    if (!name || !description) {
      return res.status(401).json({ message: "All fields are requred" });
    }
    const duplicateTodo = await todosModel.findOne({ description });
    if (duplicateTodo) {
      return res.status(403).json({ message: "Todo already exist" });
    }
    const newTodo = {
      name,
      description,
      status,
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
    const { name, description, status } = req.body;
    const { id } = req.params;
    const todoExist = await todosModel({ id });

    if (todoExist) {
      await todosModel.findOneAndUpdate({ id });
      const newRecord = {
        name: name,
        description: description,
        status: status,
      };
      await todosModel.save(newRecord);
      return res.status(201).json({ message: "Todo updated successfully" });
    } else {
      return res.status(501).json({ message: "Interanl server error" });
    }
  } catch (err) {
    console.log("Error message:", err);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todoData = await todosModel.findOneAndDelete({ id });
    if (todoData) {
      return res.status(200).json({ message: "Todo deleted" });
    } else {
      return res.status(501).json({ message: "Internal server error" });
    }
  } catch (err) {
    console.log("Error message:", err);
  }
};
