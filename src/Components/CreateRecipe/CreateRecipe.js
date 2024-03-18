import React, { useState } from "react";
import { firestore } from "../../Firebase/config";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const categories = [
  { value: "Предјадење", label: "Предјадење" },
  { value: "Главно Јадење", label: "Главно Јадење" },
  { value: "Десерт", label: "Десерт" },
];

const AddRecipeForm = () => {
  const [recipeData, setRecipeData] = useState({
    IMG: "",
    Ime: "",
    Kalorii: 0,
    Kategorija: [],
    Podgotovka: "",
    Sostojki: [],
    Vreme: "",
    Alergensi: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Kreiraj Recept", recipeData);
    try {
      await firestore.collection("Recepti").add(recipeData);
      console.log("Recipe added successfully!");
      // Optionally, redirect the user to another page after adding the recipe
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    if (name === "Sostojki") {
      // Split the ingredients string by commas and trim each ingredient
      const ingredientsArray = value
        .split(",")
        .map((ingredient) => ingredient.trim());
      setRecipeData({ ...recipeData, [name]: ingredientsArray });
    } else {
      setRecipeData({ ...recipeData, [name]: value });
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Recipe</h2>
      <form onSubmit={handleSubmit} className="recipe-form">
        <FormControl
          fullWidth
          sx={{
            marginBottom: "20px", // Set desired margin
          }}
        >
          <InputLabel id="demo-simple-select-label">Kategorii</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Kategorii"
            name="Kategorija"
            value={recipeData.Kategorija}
            onChange={handleInputChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="name"
          variant="outlined"
          name="Ime"
          value={recipeData.Ime}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          name="IMG"
          value={recipeData.IMG}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />
        {/* <TextField
          label="Sostojki"
          variant="outlined"
          name="Sostojki"
          multiline
          rows={4}
          value={recipeData.Sostojki}
          onChange={handleInputChange}
          sx={{ marginBottom: '20px' }} 

        /> */}

        <TextField
          label="Sostojki"
          variant="outlined"
          placeholder="Add ingredients (separated by commas)"
          name="Sostojki"
          multiline
          rows={4}
          value={recipeData.Sostojki}
          onChange={handleInputChange1}
          sx={{ width: "100%", marginBottom: "20px" }}
        />

        <TextField
          label="Kalorii"
          variant="outlined"
          type="number"
          name="Kalorii"
          value={recipeData.Kalorii}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />
        {/* <TextField
          label="Alergensi"
          variant="outlined"
          type="number"
          name="Alergensi"
          value={recipeData.Alergensi}
          onChange={handleInputChange}
          sx={{ marginBottom: '20px' }} 

        /> */}
        <TextField
          label="Podgotovka"
          variant="outlined"
          multiline
          rows={4}
          name="Podgotovka"
          value={recipeData.Podgotovka}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          label="Vreme"
          variant="outlined"
          name="Vreme"
          value={recipeData.vreme}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />
        {/* Add more TextField components for other fields */}
        <Button
          onClick={(e) => handleSubmit(e)}
          variant="contained"
          color="primary"
          type="submit"
        >
          Add Recipe
        </Button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
