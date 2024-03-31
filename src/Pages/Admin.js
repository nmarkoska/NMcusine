import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Container,
  Button,
  IconButton,
  Toolbar,
  AppBar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import AdminRecipes from "../Components/AdminRecipes/AdminRecipes";
import { useDispatch } from "react-redux";
import { logout } from "../feature/authSlice";
import logo from "./nmlogo.png";

const drawerWidth = 240;

const Admin = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
  };

  return (
    <div style={{ display: "flex" }}>
      <AppBar
        position="fixed"
        style={{ zIndex: 1201, backgroundColor: "#faf5f5" }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap color={"#faf5f5"}>
            <img src={logo} alt="Logo" style={{ height: 60 }} />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        style={{ width: drawerWidth, flexShrink: 0 }}
        PaperProps={{ style: { width: drawerWidth } }}
      >
        <Toolbar />
        <div style={{ width: drawerWidth }}>
          <List>
            <Link to={"/createrecipes"}>
              <ListItem button>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ color: "#000000DE" }}
                  primary="Креирај рецепт"
                />
              </ListItem>
            </Link>

            <Link to={"/"} onClick={handleLogout}>
              <ListItem button>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText sx={{ color: "#000000DE" }} primary="Одлогирај се" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
      <main style={{ flexGrow: 1, padding: "24px" }}>
        <Toolbar />
        <Container>
          <Typography variant="h4" gutterBottom></Typography>
          <List>
            {}
            <AdminRecipes />
          </List>
        </Container>
      </main>
    </div>
  );
};

export default Admin;
