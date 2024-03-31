import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice";
import recipeReducer from "../feature/recipeSlice";
import { firestore } from '../Firebase/config';
import { setRecipes, addRecipe, updateRecipe, deleteRecipe } from '../feature/recipeSlice';

// Set up Firestore listener
const unsubscribe = firestore.collection("Recepti").onSnapshot(snapshot => {
  const recipes = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  store.dispatch(setRecipes(recipes));
});

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer,
  },
});
