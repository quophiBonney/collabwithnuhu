import { useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [todo, setTodo] = useState({ name: "", description: "", status: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((pre) => ({ ...pre, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/todo", todo);
      console.log(res.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        {" "}
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={todo.name}
          placeholder="Enter name .."
        />{" "}
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={todo.description}
          placeholder="Enter description .."
        />{" "}
        <select onChange={handleChange} name="status" value={todo.status}>
          {" "}
          <option value="">Select status</option>{" "}
          <option value="completed">completed</option>{" "}
          <option value="not-started">not started</option>{" "}
          <option value="in-progress">in progress</option>{" "}
        </select>{" "}
        <button type="submit">Submit</button>{" "}
      </form>{" "}
    </>
  );
}
export default App;
