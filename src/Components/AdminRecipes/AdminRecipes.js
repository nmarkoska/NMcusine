import React, { useEffect, useState } from "react";
import { firestore } from "../../Firebase/config";
import "./AdminRecipes.css";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

//
const categories = [
  { value: "Предјадење", label: "Предјадење" },
  { value: "Главно Јадење", label: "Главно Јадење" },
  { value: "Десерт", label: "Десерт" },
];
const AdminRecipes = () => {
  const [collectionData, setCollectionData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = firestore.collection("Recepti");
        const snapshot = await collectionRef.get();
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCollectionData(data);
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (recipe) => {
    setEditedRecipe({ ...recipe });
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault(); // Prevent the default form submit action

    if (editedRecipe && editedRecipe.id) {
      try {
        // Update the document in Firestore
        await firestore
          .collection("Recepti")
          .doc(editedRecipe.id)
          .update(editedRecipe);
        console.log("Recipe updated successfully", editedRecipe);

        // Update the local state with the new recipe data
        const updatedCollectionData = collectionData.map((recipe) => {
          if (recipe.id === editedRecipe.id) {
            // This is the recipe that was edited, so we return the updated version
            return editedRecipe;
          }
          // This recipe was not edited, so we return it as is
          return recipe;
        });
        setCollectionData(updatedCollectionData);

        setEditMode(false);
        setEditedRecipe(null);
      } catch (error) {
        console.error("Error updating recipe:", error);
      }
    }
  };

  return (
    <div className="AdminRecipes-container">
      {collectionData.map((recipe) => (
        <div className="recipe-card" key={recipe.id}>
          {editMode && editedRecipe.id === recipe.id ? (
            <form onSubmit={handleSave} className="edit-recipe-form">
              {console.log({ recipe })}
              <TextField
                label="Name"
                variant="outlined"
                name="Ime"
                value={editedRecipe.Ime}
                onChange={handleInputChange}
                sx={{ marginBottom: "20px" }}
              />
              <TextField
                label="Image URL"
                variant="outlined"
                name="IMG"
                value={editedRecipe.IMG}
                onChange={handleInputChange}
                sx={{ marginBottom: "20px" }}
              />
              <TextField
                label="Ingredients (comma separated)"
                variant="outlined"
                name="Sostojki"
                multiline
                rows={4}
                value={editedRecipe.Sostojki.join(", ")}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "Sostojki",
                      value: e.target.value.split(",").map((s) => s.trim()),
                    },
                  })
                }
                sx={{ marginBottom: "20px" }}
              />
              <TextField
                label="Preparation"
                variant="outlined"
                multiline
                rows={4}
                name="Podgotovka"
                value={editedRecipe.Podgotovka}
                onChange={handleInputChange}
                sx={{ marginBottom: "20px" }}
              />
              <TextField
                label="Calories"
                variant="outlined"
                name="Kalorii"
                type="number"
                value={editedRecipe.Kalorii}
                onChange={handleInputChange}
                sx={{ marginBottom: "20px" }}
              />
              <FormControl fullWidth sx={{ marginBottom: "20px" }}>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  name="Kategorija"
                  value={editedRecipe.Kategorija}
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  label="Time"
                  variant="outlined"
                  name="Vreme"
                  value={editedRecipe.Vreme}
                  onChange={handleInputChange}
                  sx={{ marginBottom: "20px", marginTop: "20px" }}
                />
              </FormControl>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>
          ) : (
            <>
              <img className="recipe-image" src={recipe.IMG} alt={recipe.Ime} />
              <div className="recipe-content">
                <h2 className="recipe-title">{recipe.Ime}</h2>
                <Button onClick={() => handleEdit(recipe)}>Edit</Button>
                {/* Display the rest of the recipe details */}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminRecipes;
