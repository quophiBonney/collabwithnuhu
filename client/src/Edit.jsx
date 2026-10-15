import axios from "axios";
import { useState } from "react"

const Edit = ({ onClose }) => {
    const [todo, setTodo] = useState({ description: "", category: "all", date: "", time: "" });

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setTodo((pre) => (
            {
                ...pre,
                [name]: value
            }
        ))
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put("http://localhost:5000/api/v1/todo", todo)
            console.log(res.data)
        } catch (error) {
            console.log("error : ", error)
        }

    }
    return (
        // 1. Full-screen backdrop overlay
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>

            {/* 2. Modal card container */}
            <div className='relative w-full max-w-md p-6 transition-all transform bg-white rounded-2xl shadow-2xl'>

                {/* 3. Close Button (X) */}
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-xl font-medium'
                    aria-label="Close modal"
                >
                    &times;
                </button>

                {/* 4. Modal Header */}
                <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                    Edit Task
                </h2>

                {/* 5. Form */}
                <form action="" onSubmit={handleUpdate} className='flex flex-col gap-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-600 mb-1'>
                            Description
                        </label>
                        <input
                            type="text"
                            placeholder='Edit your task...'
                            className='w-full px-3 py-2 border border-gray-200 outline-none rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-700'
                        />
                    </div>
                    {/* category */}
                    <div className="">Select a category</div>
                    <select name="category" value={todo.category} onChange={handleChange} id="" className="w-full p-1 mb-3 outline-none ring ring-gray-300 rounded-md" >
                        <option value="all">All</option>
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="fun">Fun</option>
                    </select>

                    {/* date */}
                    <input type="date" value={todo.date} name="date" onChange={handleChange} className="w-full p-1 mb-3 outline-none ring ring-gray-300 rounded-md" />
                    {/* time */}
                    <input type="time" value={todo.time} name="time" onChange={handleChange} className="w-full p-1 mb-3 outline-none ring ring-gray-300 rounded-md" />

                    {/* Action Buttons */}
                    <div className='flex justify-end gap-3 mt-2'>
                        <button
                            type="button"
                            onClick={onClose}
                            className='px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors'
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className='px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all active:scale-[0.98]'
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit