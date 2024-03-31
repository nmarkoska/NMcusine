// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
      // Clear user from localStorage
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUser, clearUser, logout } = authSlice.actions;

export default authSlice.reducer;
