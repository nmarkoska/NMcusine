import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import CreateRecipe from "./Components/CreateRecipe/CreateRecipe";
import CreateRecipes from "./Pages/CreateRecipes";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/createrecipes" element={<CreateRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;
