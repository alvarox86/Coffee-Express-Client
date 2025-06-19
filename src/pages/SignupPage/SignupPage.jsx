import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/service.config";
import { Link } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";

function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    // ... contactar al backend para registrar al usuario aqui
    try {
      const newUser = {
        email,
        username,
        password,
      };

      const response = await service.post(`/auth/signup`, newUser);

      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response.status) {
        // esto es para que los errores de cliente (400) los podamos mostrar al usuario
        console.log(error.response.data.errorMessage);
        setErrorMessage(error.response.data.errorMessage);
      } else {
        // navigate a pagina de error
        navigate("/");
      }
    }
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={8}
      p={4}
      boxShadow={3}
      borderRadius={2}
      bgcolor="white"
      sx={{ marginBottom: "40px" }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        align="center"
        sx={{ color: "#8c5042" }}
      >
        Create your account
      </Typography>

      <form onSubmit={handleSignup}>
        <Stack spacing={3}>
          <TextField
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            required
          />

          <TextField
            label="Username"
            type="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            required
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            required
          />

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#8c5042",
              color: "white",
              "&:hover": {
                backgroundColor: "#c18e73",
              },
            }}
          >
            Sign up
          </Button>

          <Box textAlign="center">
            
            <Typography variant="body2" sx={{color:"#261420"}}>Already have an account?</Typography>
            <Button
              component={Link}
              to="/login"
              underline="hover"
              sx={{ fontWeight: "bold", color: "#8c5042" }}
            >
              Log in
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

export default SignupPage;
