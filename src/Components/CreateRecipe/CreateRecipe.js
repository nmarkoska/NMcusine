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
    console.log("Креирај рецепт", recipeData);
    try {
      await firestore.collection("Recepti").add(recipeData);
      console.log("Рецептот е додаден!");
      // Optionally, redirect the user to another page after adding the recipe
    } catch (error) {
      console.error("Грешка при додавање на рецепт ", error);
    }
  };

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    if (name === "Sostojki") {
      // Split the ingredients string by spaces and trim each ingredient
      const ingredientsArray = value
        .split("\n") // Split by newline character to separate ingredients
        .map((ingredient) => ingredient.trim());
      setRecipeData({ ...recipeData, [name]: ingredientsArray });
    } else {
      setRecipeData({ ...recipeData, [name]: value });
    }
  };

  return (
    <div className="form-container">
      <h2>Креирај нов рецепт</h2>
      <form onSubmit={handleSubmit} className="recipe-form">
        <FormControl
          fullWidth
          sx={{
            marginBottom: "20px", // Set desired margin
          }}
        >
          <InputLabel id="demo-simple-select-label">Катеогрија</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Катеогрија"
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
          label="Име"
          variant="outlined"
          name="Ime"
          value={recipeData.Ime}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          label="Слика URL"
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
          label="Состојки"
          variant="outlined"
          placeholder="Додади состојки"
          name="Sostojki"
          multiline
          rows={4}
          value={recipeData.Sostojki.join("\n")} // Join array with newline characters
          style={{ whiteSpace: 'pre-line' }} // Preserve newline characters
          onChange={handleInputChange1}
          sx={{ width: "100%", marginBottom: "20px" }}
        />

        <TextField
          label="Калории"
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
          label="Подготовка"
          variant="outlined"
          multiline
          rows={4}
          name="Podgotovka"
          value={recipeData.Podgotovka}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          label="Време на подготовка"
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
          Додади рецепт
        </Button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
