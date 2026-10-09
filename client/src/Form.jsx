import { useState } from "react";
import axios from "axios";
import "./App.css";
import { FaBars, FaLessThan} from "react-icons/fa"

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
    <div className="flex md:flex-col md:justify-center items-center min-h-screen">
      {/* contianer */}
      <div className="bg-gray-200 w-64">
        <div className="bg-blue-800 text-white pt-6 h-48 md:h-36 rounded-b-[150px]">
        <div className="flex justify-between px-6 md:text-xl text-3xl">
          <FaBars />
          <FaLessThan />
        </div>
        <div className="text-center text-3xl md:text-xl pt-16 md:pt-10 font-bold">New Task</div>
      </div>

      <div>
        <form action="" className="flex flex-col items-center mt-6 p-4">
          {/* description */}
          <textarea type="text" placeholder="Add a description..." className="w-full h-14 p-1 mb-3 outline-none ring ring-gray-300 focus:ring-blue-500 rounded-md" />
          {/* category */}
          <select name="" id="" className="w-full p-1 mb-3 outline-none ring ring-gray-300 rounded-md" >
            <option value="">Category</option>
            <option value="">cat1</option>
            <option value="">cat2</option>
            <option value="">cat3</option>
          </select>

          {/* date */}
          <input type="date" placeholder="Add a description..." className="w-full p-1 mb-3 outline-none ring ring-gray-300 rounded-md" />
          {/* time */}
          <input type="time" placeholder="Add a description..." className="w-full p-1 mb-3 outline-none ring ring-gray-300 rounded-md" />
          {/* important */}
          <p className="flex justify-between w-full border border-gray-300 p-1 rounded-md mb-3"><div>Important</div> <input type="checkbox" name="" id="" /></p>

          <button className="bg-blue-800 w-24 p-2 rounded-full text-white">Done</button>
        </form>
      </div>
      </div>
      
    </div>
  );
}
export default Form;
