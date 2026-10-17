import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";
import "./App.css";
import { todos } from "./data";
import {
  FaEdit,
  FaTrash,
  FaPlusSquare,
  FaBars,
  FaLessThan,
} from "react-icons/fa";
import Edit from "./Edit";

function Home() {
  const [todo, setTodo] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const date = new Date().toDateString();
  const fetchTodo = async (e) => {
    if (e) e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5000/api/v1/todo");
      console.log(res.data.data);
      setTodo(res.data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchTodo();
    console.log(todos);
  }, []);

  const handleDelete = async (id) => {};

  return (
    <div className="">
      <div className="md:flex flex-col justify-center items-center min-h-screen bg-gray-200 w-full">
        <div className="w-full md:w-96 bg-gray-300">
          <div className="bg-blue-800 px-4 pt-6 rounded-br-[120px] ">
            <div className="flex justify-between text-white pb-6">
              <div className="">
                <h3 className="font-bold text-base text-white">
                  Today : {date}
                </h3>
                <p className="text-white">1 of 6 items</p>
              </div>
              <div className="flex justify-center items-center gap-2">
                <div className="">
                  <FaLessThan />
                </div>
                <div className="">
                  <a href="/form">
                    <FaPlusSquare className="text-xl text-white bg-gray-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* All items */}
          <div>
            {todo.map((tod) => (
              <div
                className={`flex flex-col m-2 bg-white/80 rounded-md p-5 shadow-2xl `}
              >
                <div>
                  <div className="text-medium font-medium capitalize">
                    {tod.description}
                  </div>
                  <div className="flex gap-4">
                    <div className="text-sm text-gray-500">{tod.time}</div>
                    <div className="text-sm text-gray-500">{tod.date}</div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex gap-2 mt-3">
                    <div className="text-sm font-bold uppercase text-amber-500/90 border-2 border-amber-500/90 rounded p-1">
                      {tod.category}
                    </div>
                    <div className="font-bold uppercase text-indigo-500/80 border-2 border-indigo-500/80 rounded p-1 text-sm">
                      {tod.important === "yes" ? "important" : ""}
                    </div>
                  </div>
                  <div className="flex text-md gap-2">
                    <div className="bg-blue-500 text-white rounded p-2">
                      <FaEdit onClick={() => setShowEditForm(true)} />
                    </div>
                    <div className="bg-red-500 text-white rounded p-2">
                      <FaTrash onClick={() => setShowEditForm(true)} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showEditForm && <Edit onClose={() => setShowEditForm(false)} />}
    </div>
  );
}
export default Home;
