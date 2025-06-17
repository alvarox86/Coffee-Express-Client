import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./MyNavbar.css";
import cafeicon from "../../assets/images/cafeicon.png";
import axios from "axios";

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
import Face2Icon from "@mui/icons-material/Face2";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { Button } from "@mui/material";

function MyNavBar({ products, setProducts }) {
  const { isLoggedIn, loggedUserId, rol } = useContext(AuthContext);

  const navigate = useNavigate();

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

  const handleInputChange = (event) => {
    setProducts(event.target.value);
  };

  const handleSearchButton = () => {
    navigate("/products");
  };

  //--------------------------------------------

  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const [userUserName, setUserUserName] = useState(null);
  const [userCart, setUserCart] = useState([])

  const params = useParams();

  useEffect(() => {
    getData();
  }, [loggedUserId]);

  const getData = async () => {
    const storedToken = localStorage.getItem("authToken");
    try {
      if (AuthContext) {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/user`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        
        setUserCart(response.data.cart)
        setUserUserName(response.data.username);
        setUserProfilePicture(response.data.profilepicture);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //--------------------------------------------

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
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
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "15ch",
      },
    },
  }));

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
          to={"/CharacterDetails/1"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem>
            <Face2Icon sx={{ paddingRight: "10px" }} /> Our Products
          </ListItem>
        </Link>
        <Divider />
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
        <Link
          to={`/userprofile/${loggedUserId}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem>
            <InfoIcon sx={{ paddingRight: "10px" }} /> User profile
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

          <Search className="searchBtnNavBar">
            <SearchIconWrapper>
            {/* value={products} onChange={handleInputChange} */}
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {<IconButton aria-label="cart">
            <Badge badgeContent={userCart.length} color="error">
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
                    src={userProfilePicture}
                    alt="User"
                    style={{ width: "36px", borderRadius: "50%" }}
                  />
                  <Typography variant="body1" >{userUserName}</Typography>
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
