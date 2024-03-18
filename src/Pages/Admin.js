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

const drawerWidth = 240;

const Admin = () => {
  return (
    <div style={{ display: "flex" }}>
      <AppBar position="fixed" style={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
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
                  primary="Create Product"
                />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
      <main style={{ flexGrow: 1, padding: "24px" }}>
        <Toolbar />
        <Container>
          <Typography variant="h4" gutterBottom>
            Product List
          </Typography>
          <List>
            {/* {['Product 1', 'Product 2', 'Product 3'].map((product, index) => (
              <ListItem key={index}>
                <ListItemText primary={product} />
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))} */}
            <AdminRecipes />
          </List>
        </Container>
      </main>
    </div>
  );
};

export default Admin;
