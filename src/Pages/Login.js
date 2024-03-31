import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/config"; // Import Firebase authentication instance
import { useDispatch } from "react-redux";
import { setUser } from "../feature/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!username || !password) {
      setError("Те молам внеси валиден емаил и лозинка");
      return;
    }

    // Email format validation
    if (!isValidEmail(username)) {
      setError("Те молам внеси валидна емаил адреса");
      return;
    }

    try {
      // Attempt to log in with Firebase
      const userCredential = await auth.signInWithEmailAndPassword(
        username,
        password
      );
      console.log("Корисникот се логира успешно");

      // Dispatch setUser action with user credentials
      dispatch(setUser(userCredential.user));

      // Save the user info to local storage
      localStorage.setItem("userInfo", JSON.stringify(userCredential.user));

      // Redirect to admin page upon successful login
      navigate("/admin");
    } catch (error) {
      console.error("Грешка при логирање", error.message);
      setError("Невалиден емаил или лозинка! Те молам обиди се повторно");
    }
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Логин
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Емаил"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Пасворд"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 20 }}
            >
              Логирај се
            </Button>
          </form>
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
