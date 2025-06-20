import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../../services/service.config";
import { UserContext } from "../../context/profile.context";
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";

function LoginPage() {

  const navigate = useNavigate()

  const { authenticateUser } = useContext(AuthContext)

  const {getUserData} = useContext(UserContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();


    // here we contact backend to validate user credentials

    const userCredentials = {
      email,
      password
    }

    try {

      const response = await service.post(`/auth/login`, userCredentials)
      localStorage.setItem("authToken", response.data.authToken)

      await authenticateUser()
          getUserData();
      navigate("/")
      
    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
  
      } else {
        navigate("/")
      }
    }

  };

  return (
    <Box maxWidth={400}
      mx="auto"
      mt={8}
      p={4}
      boxShadow={3}
      borderRadius={2}
      bgcolor="white"
      sx={{marginBottom: "20px"}}>

      <Typography variant="h5" fontWeight="bold" gutterBottom align="center" sx={{ color: "#8c5042" }}> Log in to your Account</Typography>

      <form onSubmit={handleLogin}>
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
            Log In
          </Button>

      </Stack>
      </form>

    </Box>
  );
}

export default LoginPage;