import "./App.css";
import Home from "./Home";
import FoodieLogin from "./pages/FoodieLogin";
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  
  return (

    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<FoodieLogin />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}
export default App;
