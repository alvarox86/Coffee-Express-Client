import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { UserContext } from "../../context/profile.context";
import "./MyNavBar.css";
import cafeicon from "../../assets/images/cafeicon.png";
import service from "../../services/service.config";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoIcon from "@mui/icons-material/Info";
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import {Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function MyNavBar({ setSearchProducts }) {
  const { isLoggedIn, loggedUserId, rol } = useContext(AuthContext);
  const { userName, userImgUrl, userCart} = useContext(UserContext)

  const navigate = useNavigate();
  const [inputSearchValue, setInputSearchValue] = useState("");

  const { authenticateUser } = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  /*LOG OUT */
  const handleLogout = async () => {
    localStorage.removeItem("authToken");

    try {
      await authenticateUser();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //----------------Search Bar------------------

  const handleSearchButton = () => {
    setSearchProducts(inputSearchValue); //Actualizamos el estado global
    navigate("/products"); // y lo redirigimos a la página de productos
  };

  /*SIDEBAR */

  const DrawerList = (
    <Box
      sx={{ width: 250, margin: "10px", borderRadius: "25px" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
          <ListItem>
            <HomeIcon sx={{ paddingRight: "10px" }} /> Home
          </ListItem>
        </Link>
        <Divider />
        <Link
          to={"/products"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem>
            <FreeBreakfastIcon sx={{ paddingRight: "10px" }} /> Our Products
          </ListItem>
        </Link>
        <Divider />
        <Link
          to={`/cart`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem>
            <ShoppingCartIcon sx={{ paddingRight: "10px" }} /> My cart
          </ListItem>
        </Link>
        <Divider />
        <Link
          to={`/userprofile/${loggedUserId}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem>
            <AccountCircleIcon sx={{ paddingRight: "10px" }} /> User profile
          </ListItem>
        </Link>
        <Divider />
        <Link
          to={"https://github.com/alvarox86/Coffee-Express-Client"}
          style={{ textDecoration: "none", color: "black" }}
          target="_blank"
        >
          <ListItem>
            <GitHubIcon sx={{ paddingRight: "10px" }} /> Repository
          </ListItem>
        </Link>
        <Divider />
        <Link
          to={"/AboutPage"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem>
            <InfoIcon sx={{ paddingRight: "10px" }} /> About the page
          </ListItem>
        </Link>
        <Divider />
        {rol === "vendor" && (
          <>
            <Link
              to={"/create-product"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem>
                <AddCircleIcon sx={{ paddingRight: "10px" }} /> Create a new
                product
              </ListItem>
            </Link>
            <Divider />
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default">
        <Toolbar
          className="toolBar"
          sx={{
            minHeight: "60px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={toggleDrawer(true)} />
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={cafeicon}
              alt="LogoPagina"
              style={{ height: "80px", marginRight: "20px" }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              <h1>Coffee Express</h1>
            </Typography>
          </Box>

          {/*Search bar */}

          <Paper
            component="form"
            onSubmit={(e) => {
              e.preventDefault(); // evita que recargue la página
              handleSearchButton();
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", sm: 300 }, //responsividad
              height: 40,
              boxShadow: 1,
            }}
          >
            {/* Botón de limpiar solo visible si hay texto escrito */}
            {inputSearchValue && (
              <IconButton
                onClick={() => {
                  setInputSearchValue(""); // limpia el input
                  setSearchProducts(""); // limpia el filtro aplicado
                }}
                sx={{ p: "10px" }}
                aria-label="clear"
              >
                <CloseIcon />
              </IconButton>
            )}
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={inputSearchValue}
              onChange={(e) => setInputSearchValue(e.target.value)}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          {<IconButton aria-label="cart">
            <Badge badgeContent={userCart} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>}

          {/* Auth */}
          <Link
            to={"/signup"}
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "20px",
            }}
          >
            {isLoggedIn === true ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <div className="loggedCard" key={loggedUserId}>
                  <img
                    src={userImgUrl}
                    alt="User"
                    style={{ width: "36px", borderRadius: "50%" }}
                  />
                  <Typography variant="body1" >{userName}</Typography>
                </div>
                <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
                  LogOut
                </button>
              </Box>
            ) : (
              <>
                <AccountCircleIcon sx={{ width: "50px", height: "50px" }} />
                <Typography variant="body1">Sign Up</Typography>
              </>
            )}
          </Link>
        </Toolbar>
      </AppBar>

      {/*Para que no tape el contenido porque el navbar está fixed */}
      <Toolbar />
      <Toolbar />
    </Box>
  );
}

export default MyNavBar;
