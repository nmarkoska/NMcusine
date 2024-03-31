import React, { useState, useRef } from "react";
import Recipes from "../Components/Recipes/Recipes";
import Search from "../Components/Search/Search";
import Menu from "../Components/Menu/Menu";
import ZaNas from "../Components/ZaNas/ZaNas";
import Popup from "../Components/PopUp/Popup";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryTerm, setCategoryTerm] = useState("");
  const [alergiesTerm, setAlergiesTerm] = useState("");
  const recipesRef = useRef(null);

  console.log({ categoryTerm });

  const handleScrollToRecipes = () => {
    // Smooth scroll to the Recipes component
    recipesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Menu
        setCategoryTerm={setCategoryTerm}
        handleScrollToRecipes={handleScrollToRecipes}
        setAlergiesTerm={setAlergiesTerm}
      />
      <ZaNas />
      <Search setSearchTerm={setSearchTerm} />
      <div ref={recipesRef}>
        <Recipes
          searchTerm={searchTerm}
          categoryTerm={categoryTerm}
          alergiesTerm={alergiesTerm}
        />
      </div>
      <Popup />
    </div>
  );
}

export default Home;
