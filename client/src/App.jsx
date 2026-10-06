import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form"
import "./App.css";
import { todos } from "./data";

function App() {
  const [show, setShow] = useState(false)
  const fetchTodo = async (e) => {
    if(e) e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5000/api/v1/todo", todo);
      console.log(res.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    fetchTodo()
    console.log(todos);
    
  },[])

  return (

    <div className="flex items-center flex-col">
      <div className="flex justify-between py-3 px-4 w-[60%] h-14 rounded-full bg-gray-400 items-center mt-6">
        <div className="font-bold text-xl text-white">ToDo</div>
        <div className="py-1 px-2 bg-gray-100 rounded-full font-bold text-gray-400 cursor-pointer" onClick={() => setShow(true)}> + Add todo</div>
      </div>

      {/* <div className="border border-gray-400 w-[60%] rounded-xl mt-8 h-46 p-4">
        <h2 className="text-center font-medium text-xl">All Todo</h2>
        {todos.map((todo)=> {
          <div className="border border-gray-400 rounded-xl p-4 mt-4">
            <h3>{todo.name}</h3>
            <div>{todo.description}</div>
            <div>{todo.status}</div>
            <div><div>Edit</div> <div>Del</div></div>
          </div>
        })} */}
      </div>

      // {show && (
      //   <Form onClose={() => setShow(false)} />
      // )}
    // </div>
  );
}
export default App;
