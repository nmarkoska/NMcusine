import React, { useState } from "react";
import "./RecipeCard.css";
import { useSelector } from "react-redux";
import OverflowCard from "../OverflowCard/OverflowCard";
import { Container, Button, Box, Avatar } from "@mui/material";

const Recipes = ({ searchTerm, categoryTerm, alergiesTerm }) => {
  const recipesData = useSelector((state) => state?.recipes?.recipes);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Logic to calculate the current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredRecipes = recipesData.filter((recipe) => {
    // Check if recipe name includes searchTerm
    const nameMatch = recipe.Ime.toLowerCase().includes(
      searchTerm.toLowerCase()
    );
    // Check if recipe category matches categoryTerm
    const categoryMatch =
      recipe.Kategorija.toLowerCase() === categoryTerm.toLowerCase();
    // If categoryTerm is empty, or recipe matches categoryTerm, return true
    // Check if alergiesTerm is not empty
    if (alergiesTerm !== "") {
      // Check if any ingredient in the recipe matches the allergy term
      const hasAllergy = recipe.Sostojki.some((ingredient) =>
        ingredient.toLowerCase().includes(alergiesTerm.toLowerCase())
      );
      // Return false if there are allergies
      if (hasAllergy) return false;
    }

    // If categoryTerm is empty, or recipe matches categoryTerm, and there are no allergies, return true
    // If categoryTerm is not empty and recipe doesn't match, or there are allergies, return false
    return (!categoryTerm || categoryMatch) && (!searchTerm || nameMatch);
  });
  const currentItems = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);

  // Logic to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  // Generate array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Set your desired maxWidth */}
        {currentItems.map((recipe) => (
          <OverflowCard key={recipe.id} recipe={recipe} />
        ))}
      </Container>
      {/* Pagination buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {currentPage > 1 && (
          <Avatar
            onClick={() => paginate(currentPage - 1)}
            variant="rounded"
            sx={{
              backgroundColor: "#edc7ce",
              color: "#ed8093",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            {"<"}
          </Avatar>
        )}
        {Array.from({ length: totalPages }, (_, i) => (
          <Avatar
            key={i + 1}
            onClick={() => paginate(i + 1)}
            variant={i + 1 === currentPage ? "contained" : "rounded"}
            sx={{
              backgroundColor: i + 1 === currentPage ? "#ed8093" : "#edc7ce",
              color: i + 1 === currentPage ? "white" : "#333",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            {i + 1}
          </Avatar>
        ))}
        {currentPage < totalPages && (
          <Avatar
            onClick={() => paginate(currentPage + 1)}
            variant="rounded"
            sx={{
              backgroundColor: "#edc7ce",
              color: "#ed8093",
              cursor: "pointer",
              marginLeft: "10px",
            }}
          >
            {">"}
          </Avatar>
        )}
      </Box>
    </>
  );
};

export default Recipes;
