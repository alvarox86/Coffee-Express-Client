import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./MyNavBar.css"
import cafeicon from "../../assets/images/cafeicon.png"
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
import Face2Icon from '@mui/icons-material/Face2';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function MyNavBar() {
  const { isLoggedIn } = useContext(AuthContext)
  const {loggedUserId} = useContext(AuthContext)

  const navigate = useNavigate()

  const { authenticateUser } = useContext(AuthContext)

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {

    // borrar el token de local storage
    localStorage.removeItem("authToken")

    try {
      
      // como el token no existe, la funcion cambia los estados del contexto para indicar que el usuario ya no está logeado
      await authenticateUser()

      navigate("/") // o cualquier otra página pública

    } catch (error) {
      console.log(error) 
    }
  }

  //--------------------------------------------

  const [userProfilePicture, setUserProfilePicture ] = useState(null)
  const [userUserName, setUserUserName] = useState(null)

  const params = useParams()

  useEffect(() =>{
    getData()
  },[params])

  const getData = async () =>{
    const storedToken = localStorage.getItem("authToken")
    try {
      if(AuthContext){
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/${loggedUserId}`, { headers: { Authorization: `Bearer ${storedToken}` }})

        setUserUserName(response.data.username)
        setUserProfilePicture(response.data.profilepicture)
      }
    } catch (error) {
      console.log(error)
    }
  }


  //--------------------------------------------
  const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch'
    },
  },
}));

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
        <Link to={"/CharacterDetails/1"} style={{ textDecoration: "none", color: "black" }}>
          <ListItem>
            <Face2Icon sx={{ paddingRight: "10px" }} /> Productos
          </ListItem>
        </Link>
        <Divider />
        <Divider />
        <Link to={"https://github.com/alvarox86/Coffee-Express-Client"} style={{ textDecoration: "none", color: "black" }} target="_blank">
          <ListItem>
            <GitHubIcon sx={{ paddingRight: "10px" }} /> Repository
          </ListItem>
        </Link>
        <Divider />
        <Link to={"/AboutPage"} style={{ textDecoration: "none", color: "black" }}>
          <ListItem>
            <InfoIcon sx={{ paddingRight: "10px" }} /> About the page
          </ListItem>
        </Link>
        <Divider />
        
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar className="toolBar" sx={{ margin: "10px" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, xs: 'none', sm: 'block' }}
          >
            <MenuIcon onClick={toggleDrawer(true)} />
            <Drawer
              open={open}
              onClose={toggleDrawer(false)}
              sx={{ margin: "20px" }}
            >
              {DrawerList}
            </Drawer>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center",display:"flex",flexDirection:"row" }}
          >
            <img src={cafeicon}alt="LogoPagina" style={{ height: "100px" }} />
            <h1>Coffee Express</h1>
          </Typography>
          <Search className="searchBtnNavBar">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Link to={"/signup"}  style={{ textDecoration: "none", color: "black" }}>
            {isLoggedIn === true ? (
              <>
                <div className="loggedCard">
                  <img src={userProfilePicture} alt="User Icon" style={{width:"50px"}}/>
                  <p>{userUserName}</p>
                </div>
                <button onClick={handleLogout}>LogOut</button>
              </>
            ):(
              <>
                <AccountCircleIcon sx={{width:"50px", height:"50px"}} />
              </>
              )
            }
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MyNavBar;