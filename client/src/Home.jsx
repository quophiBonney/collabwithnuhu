import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { FaEdit, FaTrash, FaPlusSquare } from "react-icons/fa"
import Edit from "./components/Edit";
import Form from "./components/Form";

function Home() {
    const [todo, setTodo] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const date = new Date().toDateString()
    const [searchTerm, setSearchTerm] = useState("")
    const fetchTodo = async (e) => {
        if (e) e.preventDefault();
        try {
            const res = await axios.get("http://localhost:5000/api/v1/todo");
            setTodo(res.data?.data)
        } catch (error) {
            console.log("Error:", error);
        }
    }

    useEffect(() => {
        fetchTodo()
    }, [])

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/v1/todo/${id}`)
            setSuccess(res.data.message || "Todo deleted successfully");
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        } catch (error) {
            console.log(error);
            setError(
                error.response?.data?.message || "Failed to delete todo"
            );
        }
    }

    const filterdTodo = todo.filter((tod) =>
        tod.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return (

        <div className="">
            <div className="flex flex-col items-center h-[90vh] bg-gray-100 w-full md:py-6 overflow-hidden">

                <div className="flex flex-col w-full md:w-80 bg-gray-100 shadow-md overflow-hidden">
                    <div className="text-white p-4 bg-blue-800  rounded-br-[100px] ">
                        <h3 className="font-bold text-xl">Today : {date}</h3>
                        <p className="text-gray-300">{filterdTodo.length} items</p>
                    </div>
                    <div className="flex items-center p-2 gap-4">
                        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search todo ..." className="border border-gray-300 w-full rounded-md outline-none rounded-md px-2 py-1 focus:border-blue-400" />
                        <div className="text-3xl cursor-pointer ">
                            <FaPlusSquare className=" text-gray-600" onClick={() => setShowForm(true)} />
                        </div>
                    </div>
                    {/* All items */}
                    <div className="flex-1 overflow-y-auto min-h-0 px-2">
                        {error && (
                            <p className="text-red-500">{error}</p>
                        )}
                        {success && (
                            <p className="text-green-500">{success}</p>
                        )}
                        {filterdTodo.map((tod) => (
                            <div key={tod._id} className={`flex my-2 w-full shadow-[0_0_0px_1px_rgba(0,0,0,0.1)] rounded-md py-1 px-2 border-l-2 ${tod.important === "yes" ? "border-red-600" : "border-transparent"}`}>
                                <div className="w-full">
                                    <div className="text-medium font-medium">{tod.description}</div>
                                    {/* <div className="flex gap-4">
                                        <div className="text-xs text-gray-500">{tod.time}</div>
                                        <div className="text-xs text-gray-500">{tod.date}</div>
                                    </div> */}
                                    <div className="flex gap-8 w-full justify-between text-sm items-center">
                                        <div className="flex gap-2">
                                            <div className="bg-gray-300 px-1 rounded-md text-gray-500">{tod.category}</div>
                                            <div className="text-red-500 ">{tod.important === "yes" ? "important" : ""}</div>
                                        </div>
                                        <div className="flex text-md gap-2">
                                            <FaEdit className="text-blue-500 cursor-pointer" onClick={() => setShowEditForm(tod._id)} />
                                            <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDelete(tod._id)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showEditForm && (<Edit todoId={showEditForm} onClose={() => setShowEditForm(false)} />)}
            {showForm && (<Form onClose={() => setShowForm(false)} />)}
        </div>
    );
}
export default Home;
