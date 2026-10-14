import { useState } from "react";
import axios from "axios";
import "./App.css";
import { FaBars, FaLessThan} from "react-icons/fa"
import { useNavigate } from "react-router-dom";

function Form({ onClose }) {
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [isImportant, setIsImportant] = useState("no")
  const [todo, setTodo] = useState({ description: "", category: "all", date:"", time:""});
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((pre) => ({ ...pre, [name]: value }));
  };

  const todoForm = {
    ...todo,
    important: isImportant
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/todo", todoForm);
      console.log(res.data);
      console.log(todoForm)
      setSuccess(res.data.message || "Todo added successfully")
      
      setTimeout(() => {
        setSuccess("")
        navigate("/")
      }, 3000);
    } catch (error) {
      console.log("Error:", error);
      setError(error.response?.data?.message || "Something went wrong")
      setTimeout(() => {
        setError("")
      }, 3000);
    }
  };
  return (
    <div className="md:flex md:flex-col md:justify-center items-center min-h-screen">
      {/* contianer */}
      <div className="w-full md:w-72 p-0 min-h-screen md:min-h-0 bg-gray-200 w-64">
        <div className="bg-blue-800 text-white pt-6 h-42 md:h-36 rounded-b-[150px]">
        <div className="flex justify-between px-6 text-xl md:text-2xl">
          <FaBars />
          <FaLessThan onClick={() => navigate("/")} />
        </div>
        <div className="text-center text-xl md:text-3xl md:text-xl pt-16 md:pt-10 font-bold">New Task</div>
      </div>

      <div> 
        <form action="" onSubmit={handleSubmit} className="flex flex-col items-center mt-6 p-4">
          {error && (<p className="text-red-600 p-2 bg-red-200 rounded-md w-full mb-2 text-center">{error}</p>)}
          {success && (<p className="text-green-600 p-2 bg-green-200 rounded-md w-full mb-2 text-center">{success}</p>)}
          {/* description */}
          <textarea type="text" name="description" value={todo.description} onChange={handleChange} placeholder="Add a description..." className="w-full h-14 p-1 mb-3 outline-none ring ring-gray-300 focus:ring-blue-500 rounded-md" />
          {/* category */}
          <div className="">Select a category</div>
          <select name="category" value={todo.category} onChange={handleChange} id="" className="w-full p-1 mb-3 outline-none ring ring-gray-300 rounded-md" >
            <option value="all">All</option>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="fun">Fun</option>
          </select>

          {/* date */}
          <input type="date" value={todo.date} name="date" onChange={handleChange}  className="w-full p-1 mb-3 outline-none ring ring-gray-300 rounded-md" />
          {/* time */}
          <input type="time" value={todo.time} name="time" onChange={handleChange} className="w-full p-1 mb-3 outline-none ring ring-gray-300 rounded-md" />
          {/* important */}
          <div className="flex justify-between w-full border border-gray-300 p-1 rounded-md mb-3"><div>Important</div> <input type="checkbox" name="important" checked={isImportant === "yes"} onChange={(e) => setIsImportant(e.target.checked ? "yes" : "no")} id="" /></div>

          <button className="bg-blue-800 w-24 p-2 rounded-full text-white">Done</button>
        </form>
      </div>
      </div>
      
    </div>
  );
}
export default Form;
