// recipesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipes: [],
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes(state, action) {
      state.recipes = action.payload;
    },
    addRecipe(state, action) {
      state.recipes.push(action.payload);
    },
    updateRecipe(state, action) {
      const index = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = action.payload;
      }
    },
    deleteRecipe(state, action) {
      state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
    },
  },
});

export const { setRecipes, addRecipe, updateRecipe, deleteRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
