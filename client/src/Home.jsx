import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form"
import "./App.css";
import { todos } from "./data";
import { FaEdit, FaTrash, FaPlusSquare, FaBars, FaLessThan } from "react-icons/fa"
import Edit from "./Edit";

function Home() {
    const [todo, setTodo] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false)
    const date = new Date().toDateString()
    const fetchTodo = async (e) => {
        if (e) e.preventDefault();
        try {
            const res = await axios.get("http://localhost:5000/api/v1/todo");
            console.log(res.data.data);
            setTodo(res.data.data)
        } catch (error) {
            console.log("Error:", error);
        }
    }

    useEffect(() => {
        fetchTodo()
        console.log(todos);

    }, [])

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/v1/todo/${id}`)
            setSuccess(res.data.message || "Todo deleted successfully");
        } catch (error) {
            console.log(error);
            setError(
      error.response?.data?.message || "Failed to delete todo"
    );
        }
    }

    return (

        <div className="">
            <div className="md:flex flex-col justify-center items-center min-h-screen bg-gray-200 w-full">
                <div className="w-full md:w-72 bg-gray-300">
                    <div className="bg-blue-800 px-4 pt-6 pb-8 rounded-br-[120px] ">
                        <div className="flex justify-between text-xl md:text-3xl text-white pb-6">
                            <FaBars />
                            <FaLessThan className="mr-4" />
                        </div>
                        <h3 className="font-bold text-xl text-white">Today : {date}</h3>
                        <p className="text-white pb-6">1 of 6 items</p>
                    </div>
                    <div className="flex p-4 justify-between items-center">
                        <div className="text-gray-500">
                            <p className="font-medium text-sm ">Add a new item...</p>
                            <p className="text-sm">Date and time</p>
                            <p className="text-sm">Category</p>
                        </div>
                        <a href="/form" className="mr-4"><FaPlusSquare className="text-xl text-white bg-gray-600" /></a>
                    </div>
                    {/* All items */}
                    <div>
                        {todo.map((tod) => (
                            <div className={`flex justify-between items-center m-2 bg-gray-400/20 rounded-md py-1 px-2 `}>
                                <div >
                                    <div className="text-medium font-medium">{tod.description}</div>
                                    <div className="flex gap-4">
                                        <div className="text-sm text-gray-500 text-xs">{tod.time}</div>
                                        <div className="text-sm text-gray-500 text-xs">{tod.date}</div>
                                    </div>
                                    <div className="flex gap-4">
                                    <div className="text-sm text-gray-500">{tod.category}</div>
                                    <div className="text-red-500 text-sm">{tod.important === "yes" ? "important"  : "" }</div>
                                    </div>
                                </div>
                                <div className="flex text-md gap-2">
                                    <FaEdit className="text-blue-500" onClick={() => setShowEditForm(true)} />
                                    <FaTrash className="text-red-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showEditForm && (<Edit onClose={() => setShowEditForm(false)} />)}
        </div>
    );
}
export default Home;
