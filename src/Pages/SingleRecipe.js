import React, { useState, useEffect } from "react";
import Menu from "../Components/Menu/Menu";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import firebase from "../Firebase/config";

function SingleRecipe() {
  const location = useLocation();

  const recipeId = location.pathname.split("/").pop();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true); // State to indicate loading status

  useEffect(() => {
    // Function to fetch the recipe document from Firestore
    const fetchRecipe = async () => {
      try {
        const recipeDoc = await firebase
          .firestore()
          .collection("Recepti")
          .doc(recipeId)
          .get();
        if (recipeDoc.exists) {
          // If the document exists, set the recipe state
          setRecipe(recipeDoc.data());
        } else {
          console.log("Recipe not found");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchRecipe(); // Call the fetchRecipe function when the component mounts
  }, [recipeId]); // Ensure useEffect runs only when recipeId changes

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Menu redirectToHome={true} />
      <Container
        sx={{ marginTop: "30px", marginBottom: "30px", paddingTop: "125px" }}
      >
        <Box display="flex" justifyContent="space-evenly" maxWidth="1200px">
          <Box>
            <Box sx={{ paddingTop: "px" }} maxWidth="400px">
              <h1>{recipe?.Ime}</h1>
              <h3>Состојки</h3>
              {recipe?.Sostojki.map((sostojka) => (
                <Typography key={sostojka}>{sostojka}</Typography>
              ))}
              <h3>Подготовка</h3>
              {recipe?.Podgotovka}

              <h3>Време за подготовка</h3>
              {recipe?.Vreme}

              <h3>Калории</h3>
              {recipe?.Kalorii}

              <Typography style={{ textAlign: "justify" }}></Typography>
            </Box>
          </Box>

          <Box>
            <img src={`${recipe?.IMG}`} width="570" height="380" alt="Recipe" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default SingleRecipe;
