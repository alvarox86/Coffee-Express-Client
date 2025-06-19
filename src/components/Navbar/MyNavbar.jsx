import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { UserContext } from "../../context/profile.context";
import "./MyNavbar.css";
import cafeicon from "../../assets/images/iconlogo_bsqf1c.png";

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
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function MyNavBar({ setSearchProducts }) {
  const { isLoggedIn, loggedUserId, rol } = useContext(AuthContext);
  const { userName, userImgUrl, userCart, setUserCart } =
    useContext(UserContext);

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
      setUserCart(null);
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

  //----------------Profile Menu------------------

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <Link to={`/cart`} style={{ textDecoration: "none", color: "black" }}>
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
          to={"/aboutus"}
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
            minHeight: "70px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 1 }}
          >
            <MenuIcon onClick={toggleDrawer(true)} />
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </IconButton>

          <Box
            sx={{ display: "flex", alignItems: "flex-end", flexGrow: 1, ml: 4 }}
          >
            <img
              src={cafeicon}
              alt="LogoPagina"
              style={{ width: "45px", marginRight: "15px" }}
              className="imgIcon"
            />
            <Typography
              className="h1NameApp"
              variant="h4"
              component="h1"
              sx={{ fontWeight: "bold", pb: "4px" }}
            >
              Coffee Express
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
              mr: 6,
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

          {
            <IconButton aria-label="cart" sx={{ mr: 3 }}>
              <Badge badgeContent={userCart} color="error">
                <Link to="/cart">
                  <ShoppingCartIcon sx={{ color: "grey", fontSize: "30px" }} />
                </Link>
              </Badge>
            </IconButton>
          }

          {/* Auth */}

          {isLoggedIn === true ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Box className="loggedCard" key={loggedUserId}>
                <Button
                  onClick={handleClick}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                  }}
                >
                  <img
                    src={userImgUrl}
                    alt="User"
                    style={{ width: "36px", borderRadius: "50%" }}
                    sx={{
                      width: { xs: "40px", sm: "46px" },
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: "none",
                      color: "black",
                      paddingLeft: "10px",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    {userName}
                  </Typography>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <Link
                    to={`/userprofile/${loggedUserId}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </Box>
          ) : (
            <>
              <Link
                to={"/signup"}
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginLeft: "20px",
                }}
              >
                <AccountCircleIcon sx={{ width: "50px", height: "50px" }} />
                <Typography variant="body1">Sign Up</Typography>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/*Para que no tape el contenido porque el navbar está fixed */}
      <Toolbar />
      <Toolbar />
    </Box>
  );
}

export default MyNavBar;
