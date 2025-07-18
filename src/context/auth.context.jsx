import { createContext, useEffect, useState } from "react";
import service from "../services/service.config";
import { CircularProgress, Box, Typography } from "@mui/material";

const AuthContext = createContext();


function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [rol, setRol] = useState(null);

  const [isValidatingToken, setIsValidatingToken] = useState(true);

  const authenticateUser = async () => {
    setIsValidatingToken(true);

    // This is to validate token and to know who is the user is try to enter
    try {
      const response = await service.get(`/auth/verify`);

      // if the call comes here, the token is successfully validated

      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      setRol(response.data.payload.rol);
      setIsValidatingToken(false);
    } catch (error) {
      console.log(error);

      // if the call comes here, the token is not validated
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setRol(null);
      setIsValidatingToken(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser,
    rol,
  };

  if (isValidatingToken) {
    return (
         <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#261420",
        px: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#F2E8DF",
          border: "1px solid #e0b89c",
          borderRadius: 4,
          padding: 4,
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: "#8c5042" }}>
          ⏳ Hang tight! We’re verifying your session.
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "#261420" }}>
          This might take a few seconds because <strong>Render.com</strong> is a free platform and can be a bit slow to wake up servers.
        </Typography>
        <CircularProgress size={50} thickness={5} sx={{ color: "#8c5042" }} />
      </Box>
    </Box>
    
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
