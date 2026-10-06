import { useState } from "react";
import axios from "axios";
import "./App.css";

function Form({ onClose }) {
  const [todo, setTodo] = useState({ name: "", description: "", status: "" });
  const [success, setSuccessful] = useState("")
  const [error, setError] = useState("")

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <form onSubmit={handleSubmit} className="">
          <div className="flex justify-between mb-6">
            <h2 className="font-bold text-gray-400 text-xl">Add todo</h2>
            <button
              onClick={onClose}
              className="font-bold cursor-pointer text-red-700 hover:text-red-500 "
            >
              ✕
            </button>
          </div>
          {success && <div className="p-2 text-green-600 bg-green-200 rounded-md text-center">{success}</div>}
          {error && <div className="p-2 text-red-600 bg-red-200 rounded-md text-center">{error}</div>}
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={todo.name}
            className="w-full outline-none p-2 border border-gray-400 rounded-md mb-4 mt-4"
            placeholder="Enter name .."
          />
          <input
            type="text"
            name="description"
            onChange={handleChange}
            value={todo.description}
            className="w-full outline-none p-2 border border-gray-400 rounded-md mb-4"
            placeholder="Enter description .."
          />
          <select onChange={handleChange} name="status" className="w-full outline-none p-2  border border-gray-400 rounded-md mb-4" value={todo.status}>
            <option value="">Select status</option>
            <option value="completed">completed</option>
            <option value="not-started">not started</option>
            <option value="in-progress">in progress</option>
          </select>
          <button type="submit" className="w-full hover:bg-gray-400 hover:text-white cursor-pointer p-2 border border-gray-400 rounded-md" >Submit</button>
        </form>
      </div>
    </div>
  );
}
export default Form;
