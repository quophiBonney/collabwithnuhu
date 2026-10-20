import { FaStore, FaUtensils, FaCheckCircle, FaArrowRight } from "react-icons/fa"
const FoodieLogin = () => {
    const items = [
        "Manage incoming customer orders",
        "Update your restaurant menu",
        "Track restaurant activity",
        "Control restaurant availability"
    ]
    return (
        <div>
            <div className="flex min-h-screen">
                {/* Left Text */}
                <div className="flex flex-col bg-gray-900 w-[50%] hidden md:flex p-8 gap-8">
                    <div className="flex gap-2 ">
                        <div className="bg-orange-400 p-2 rounded-md"><FaUtensils className="text-white" /></div>
                        <p className="flex items-center gap-1 text-white font-bold text-xl">
                            Foodie <span className="bg-orange-400 w-1 h-1 rounded-full"></span>
                        </p>
                    </div>

                    <div>
                        {/* Restaurant partner */}
                        <span className="flex w-42 justify-center text-xs items-center text-yellow-400 gap-2 bg-yellow-400/10 p-2 rounded-xl">
                            <FaStore /> RESTAURANT PARTNER
                        </span>
                    </div>

                    <div className="flex flex-col gap-2 text-5xl font-bold text-white">
                        <h2>Manage your</h2>
                        <h2 className="text-orange-400">restaurant</h2>
                        <h2>effortlessly</h2>
                    </div>

                    <div className="text-gray-400">
                        Manage orders, update your menu, control restaurant availability and deliver an amazing experience to your customers.
                    </div>

                    <div>
                        {items.map((item) => (
                            <div className="flex mb-2 items-center gap-2 text-white">
                                <FaCheckCircle className="text-orange-400" /> {item}
                            </div>
                        ))}
                    </div>

                </div>
                {/* Right Text */}
                <div className="flex flex-col items-center gap-4 bg-gray-200 w-full md:w-[50%] pt-23">
                    {/* partner login */}
                    <div className="flex w-32 justify-center text-xs items-center text-orange-400 gap-2 bg-yellow-400/10 p-2 rounded-xl">
                        <FaStore /> PARTNER LOGIN
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Welcome back!</h1>
                        <p className="text-sm">Sign in to manage your restaurant, orders and menu</p>
                    </div>
                        <form action="" className="bg-white p-4 border border-gray-300 rounded-lg w-full md:w-[60%] flex flex-col gap-4">
                            <div>
                                <label htmlFor="email">Email Address <span className="text-red-600">*</span></label>
                                <input type="text" placeholder="Enter your restaurant email" className="w-full p-2 rounded-md outline-none border border-gray-400 focus:border-gray-600" />
                            </div>
                            <div>
                                <label htmlFor="email">Password <span className="text-red-600">*</span></label>
                                <input type="password" placeholder="Enter your password" className="w-full p-2 rounded-md outline-none border border-gray-400 focus:border-gray-600" />
                            </div>
                            <div className="flex gap-2 justify-end">
                                <button className="py-2 px-3 border border-gray-400 rounded-lg cursor-pointer">Cancel</button>
                                <button className="py-2 px-3 bg-orange-600 text-white rounded-lg cursor-pointer">Sign in</button>
                            </div>
                            <hr className="text-gray-400 " />
                            <div className="flex flex-col items-center">
                                <p>Don't have a restaurant account?</p>
                                <a href="" className="flex items-center gap-2 text-orange-400 font-medium">Register Your Restaurant <FaArrowRight /></a>
                            </div>
                        </form>
                        <div className="text-center">Acces is available after resturant approval by the Foodie team</div>
                </div>
            </div>
        </div>
    )
}

export default FoodieLogin