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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

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

  const handleDelete = (recipe) => {
    setRecipeToDelete(recipe);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await firestore.collection("Recepti").doc(recipeToDelete.id).delete();
      const updatedCollectionData = collectionData.filter(
        (recipe) => recipe.id !== recipeToDelete.id
      );
      setCollectionData(updatedCollectionData);
      setDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleDeleteCancelled = () => {
    setRecipeToDelete(null);
    setDeleteConfirmationOpen(false);
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
      {collectionData.map(
        (
          recipe //sve recepti so gi imam
        ) => (
          <div className="recipe-card" key={recipe.id}>
            {editMode && editedRecipe.id === recipe.id ? (
              <form
                onSubmit={handleSave}
                className="edit-recipe-form"
                sx={{ marginBottom: "20px" }}
              >
                {console.log({ recipe })}

                <TextField
                  label="Име"
                  variant="outlined"
                  name="Ime"
                  value={editedRecipe.Ime}
                  onChange={handleInputChange}
                  sx={{ marginBottom: "20px" , marginTop: "20px"}}
                />
                <TextField
                  label="Линк за слика"
                  variant="outlined"
                  name="IMG"
                  value={editedRecipe.IMG}
                  onChange={handleInputChange}
                  sx={{ marginBottom: "20px" }}
                />
                <TextField
                  label="Состојки"
                  variant="outlined"
                  name="Sostojki"
                  multiline
                  rows={4}
                  value={editedRecipe.Sostojki.join("\n")}
                  onChange={(e) => {
                    const newValue = e.target.value
                      .split("\n")
                      .map((s) => s.trim());
                    handleInputChange({
                      target: {
                        name: "Состојки",
                        value: newValue,
                      },
                    });
                  }}
                  sx={{ marginBottom: "20px" }}
                />

                <TextField
                  label="Подготовка"
                  variant="outlined"
                  multiline
                  rows={4}
                  name="Podgotovka"
                  value={editedRecipe.Podgotovka}
                  onChange={handleInputChange}
                  sx={{ marginBottom: "20px" }}
                />
                <TextField
                  label="Калории"
                  variant="outlined"
                  name="Kalorii"
                  type="number"
                  value={editedRecipe.Kalorii}
                  onChange={handleInputChange}
                  sx={{ marginBottom: "20px" }}
                />
                <FormControl fullWidth sx={{ marginBottom: "20px" }}>
                  <InputLabel>Категорија</InputLabel>
                  <Select
                    label="Категорија"
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
                    label="Време за подготовка"
                    variant="outlined"
                    name="Vreme"
                    value={editedRecipe.Vreme}
                    onChange={handleInputChange}
                    sx={{ marginBottom: "20px", marginTop: "20px" }}
                  />
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                  Зачувај
                </Button>
              </form>
            ) : (
              <>
                <img
                  className="recipe-image"
                  src={recipe.IMG}
                  alt={recipe.Ime}
                />
                <div className="recipe-content">
                  <h2 className="recipe-title">{recipe.Ime}</h2>
                  <Button onClick={() => handleEdit(recipe)}>Едитирај</Button>
                  <Button onClick={() => handleDelete(recipe)}>Избриши</Button>
                  {/* Display the rest of the recipe details */}
                </div>
              </>
            )}
          </div>
        )
      )}

      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancelled}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Потврди бришење</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Дали сте сигурни дека сакате да го избришете овој рецепт?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancelled} color="primary">
            Не
          </Button>
          <Button onClick={handleDeleteConfirmed} color="primary" autoFocus>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminRecipes;
