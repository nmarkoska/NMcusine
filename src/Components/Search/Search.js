import React from "react";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Box, Typography, TextField, Button, Container } from "@mui/material";

// Styles Search
const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#faf5f5", // Slightly darker pastel pink

  "&:hover": {
    backgroundColor: "#ebe4e4", // Darker pink on hover
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
    color: "black !important",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "53ch",
      "&:focus": {
        width: "63ch",
      },
    },
  },
}));

function Search({ setSearchTerm }) {
  return (
    <Container sx={{ marginTop: "30px", marginBottom: "30px" }}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%", // Ensures the component takes the full width of its container
          maxWidth: "1200px", // Maximum width for the component
          height: "220px",
          backgroundImage: `url(https://so-schmeckt-das-leben.de/wp-content/uploads/2020/07/BBQ-Party-header-1500x630.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
            zIndex: 1,
          },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          color="white"
          sx={{ position: "relative", zIndex: 2, mb: 4 }}
        >
          Пребарај ги твоите омилени рецепти
        </Typography>
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            maxWidth: "600px",
          }}
        >
          <SearchBar>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Пребарувај"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
        </Box>
      </Box>
    </Container>
  );
}

export default Search;
