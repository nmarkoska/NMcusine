import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Link as MuiLink } from "@mui/material";
import logo from "./nmlogo.png";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
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
      width: "18ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledLink = styled(MuiLink)(({ theme, selected }) => ({
  color: selected ? "#e91e63" : theme.palette.text.primary, // Dark pink if selected, black otherwise
  textDecoration: "none",
  fontWeight: "medium",
  fontSize: theme.typography.body1.fontSize,

  // Achieve centering using flexbox
  display: "flex",
  justifyContent: "center",
  transition: "color 0.3s", // Smooth transition for color change
  "&:hover": {
    color: "#e91e63", // Darker pink on hover
  },

  "&:active": {
    color: "#e91e63", // Darker pink on hover
  }
}));

export default function SearchAppBar({
  setCategoryTerm,
  setAlergiesTerm,
  handleScrollToRecipes,
  redirectToHome = false,
}) {
  const navigate = useNavigate();

  console.log("redirectToHome", redirectToHome);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#faf5f5" }}>
        <Toolbar>
          {/* Use img tag with your logo */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <a href="/">
              <img src={logo} alt="Logo" style={{ height: 100 }} />
            </a>
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <StyledLink
              onClick={() =>
                redirectToHome
                  ? navigate("/")
                  : (() => {
                      setCategoryTerm("Предјадење");
                      handleScrollToRecipes();
                    })()
              }
              sx={{ mr: 2, cursor: "pointer" }}
            >
              Предјадење
            </StyledLink>

            <StyledLink
              onClick={() =>
                redirectToHome
                  ? navigate("/")
                  : (() => {
                      setCategoryTerm("Главно Јадење");
                      handleScrollToRecipes();
                    })()
              }
              sx={{ mr: 2, cursor: "pointer" }}
            >
              Главно Јадење
            </StyledLink>

            <StyledLink
              onClick={() =>
                redirectToHome
                  ? navigate("/")
                  : (() => {
                      setCategoryTerm("Десерт");
                      handleScrollToRecipes();
                    })()
              }
              sx={{ mr: 2, cursor: "pointer" }}
            >
              Десерт
            </StyledLink>

            <StyledLink
              onClick={() =>
                redirectToHome
                  ? navigate("/")
                  : (() => {
                      setCategoryTerm("");
                      handleScrollToRecipes();
                    })()
              }
              sx={{ cursor: "pointer" }}
            >
              Сите рецепти
            </StyledLink>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Внеси алергенс"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setAlergiesTerm(e.target.value)}
                onClick={() =>
                  redirectToHome
                    ? navigate("/")
                    : (() => {
                        setCategoryTerm("");
                        handleScrollToRecipes();
                      })()
                }
                sx={{ cursor: "pointer" }}
              />
            </Search>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
