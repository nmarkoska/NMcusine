import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import CreateRecipes from "./Pages/CreateRecipes";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { useDispatch } from "react-redux";
import { setUser } from "./feature/authSlice"; // Adjust the import path as needed
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleRecipe from "./Pages/SingleRecipe";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const user = JSON.parse(userInfo);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
          {/* Any other protected routes */}
          <Route path="/createrecipes" element={<CreateRecipes />} />
          <Route path="/singlerecipe/:id" element={<SingleRecipe />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
