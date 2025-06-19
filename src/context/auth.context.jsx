import { createContext, useEffect, useState } from "react";
import service from "../services/service.config";
import { CircularProgress, Box } from "@mui/material";


const AuthContext = createContext();

// el componente que almacena y controla los estados del contexto
function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [rol, setRol] = useState(null);

  const [isValidatingToken, setIsValidatingToken] = useState(true);


  const authenticateUser = async () => {
    setIsValidatingToken(true)

    // funcion para validar el token del usuario y saber quien es y actualiza los estados
    try {
      const response = await service.get(`/auth/verify`);

      // si la llamada llega a este punto significa que el backend valido el token
      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      setRol(response.data.payload.rol);
      setIsValidatingToken(false);
    } catch (error) {
      console.log(error)

      // si la llamada llega a este punto significa que el token no existe, no es valido o expiró
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
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={60} thickness={5} sx={{ color: "#8B4513" }} />
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
