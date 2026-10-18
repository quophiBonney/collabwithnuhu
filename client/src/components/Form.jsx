import { useState } from "react";
import axios from "axios";
import "../App.css";
import { FaTimes } from "react-icons/fa"

function Form({ onClose }) {
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [isImportant, setIsImportant] = useState("no")
  const [isSubmit, setIsSubmit] = useState(false)
  const [todo, setTodo] = useState({ description: "", category: "all", date: "", time: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((pre) => ({ ...pre, [name]: value }));
  };

  const todoForm = {
    ...todo,
    important: isImportant
  }
  const handleSubmit = async (e) => {
    setIsSubmit(true)
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/todo", todoForm);
      console.log(todoForm)
      setSuccess(res.data.message || "Todo added successfully")

      setTimeout(() => {
        setSuccess("")
        window.location.reload()
      }, 2000);
    } catch (error) {
      console.log("Error:", error);
      setError(error.response?.data?.message || "Something went wrong")
      setTimeout(() => {
        setError("")
        setIsSubmit(false)
      }, 2000);
    }
  };
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>

      {/* 2. Modal card container */}
      <div className='relative w-full max-w-sm p-6 transition-all transform bg-white rounded-2xl shadow-2xl'>
        <div className="flex justify-between items-center text-blue-600 pb-4">
          <div className="text-center text-xl md:text-3xl md:text-xl font-bold">New Task</div>
          <div className="text-xl cursor-pointer text-red-600 md:text-2xl">
            <FaTimes onClick={onClose} />
          </div>
        </div>

        <div>
          <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
            {error && (<p className="text-red-600 p-2 bg-red-200 rounded-md w-full mb-2 text-center">{error}</p>)}
            {success && (<p className="text-green-600 p-2 bg-green-200 rounded-md w-full mb-2 text-center">{success}</p>)}
            {/* description */}
            <textarea type="text" name="description" value={todo.description} onChange={handleChange} placeholder="Add a description..." className="w-full h-14 p-2 outline-none ring ring-gray-300 focus:ring-blue-500 rounded-md" />         

            <div className="flex gap-4 w-full">
              {/* date */}
              <input type="date" value={todo.date} name="date" onChange={handleChange} className="w-full p-1 outline-none ring ring-gray-300 rounded-md" />
              {/* time */}
              <input type="time" value={todo.time} name="time" onChange={handleChange} className="w-full p-1 outline-none ring ring-gray-300 rounded-md" />
            </div>
            <div className="flex w-full gap-4">
              {/* important */}
            <div className="flex justify-between w-full border border-gray-300 p-1 rounded-md"><div>Important</div> <input type="checkbox" name="important" checked={isImportant === "yes"} onChange={(e) => setIsImportant(e.target.checked ? "yes" : "no")} id="" /></div>
            {/* category */}
            <select name="category" value={todo.category} onChange={handleChange} id="" className="w-full p-1 outline-none ring ring-gray-300 rounded-md" >
              <option value="all">Select a Category</option>
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="fun">Fun</option>
            </select>
            </div>

            <button disabled={isSubmit} className={`w-full py-2 rounded cursor-pointer text-white font-medium transition-all ${
                    isSubmit ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700" }`} >{isSubmit ? "Saving ..." : "Add Todo"}</button>
          </form>
        </div>
      </div>

    </div>
  );
}
export default Form;
