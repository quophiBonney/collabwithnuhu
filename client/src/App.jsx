import "./App.css";
import Home from "./Home";
import Form from "./Form";
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  
  return (

    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/form" element={<Home />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}
export default App;
