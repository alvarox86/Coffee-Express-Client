import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link, useParams } from "react-router-dom";
import service from "../../services/service.config";
import { Box, Button, Paper, Typography } from "@mui/material";
import "./UserProfilePage.css";

function UserProfilePage() {
  const params = useParams();
  const { isLoggedIn } = useContext(AuthContext);
  const { loggedUserId } = useContext(AuthContext);
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const [userUserName, setUserUserName] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [userAdress, setUserAdress] = useState(null);

  useEffect(() => {
    getData();
  }, [params]);

  const getData = async () => {
    const storedToken = localStorage.getItem("authToken");

    try {
      if (storedToken) {
        const response = await service.get(`/user`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setUserUserName(response.data.username);
        setUserProfilePicture(response.data.profilepicture);
        setUserPhone(response.data.phone);
        setUserAdress(response.data.adress);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="userProfileInfo">
      {isLoggedIn ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 4,
              mb: 5,
              backgroundColor: "#F2E8DF",
              padding: "20px",
              borderRadius: "10px",
              marginTop:"60px"
            }}
          >
            <Box
              component="img"
              src={userProfilePicture}
              alt="foto perfil"
              sx={{
                width: { xs: "100%", sm: "40%" },
                borderRadius: 2,
                objectFit: "cover",
                maxHeight: 400,
              }}
            />
            <Paper elevation={3} sx={{ flex: 1, p: 3 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                Name:
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {userUserName}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                Address:
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {userAdress}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                Phone:
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {userPhone}
              </Typography>
            </Paper>
          </Box>
          <div className="btnEditProfile">
            <Link to={`/editprofile/${loggedUserId}`}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#8B5042",
                  color: "white",
                  mt: 3,
                  "&:hover": {
                    backgroundColor: "#6c3a2f",
                  },
                }}
              >
                Edit profile
              </Button>
            </Link>
          </div>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            minHeight: "60vh",
            mt: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#F2E8DF",
              mb: 2,
            }}
          >
            You need an account to see this page
          </Typography>

          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6c3a2f",
                "&:hover": {
                  backgroundColor: "#552820",
                },
              }}
            >
              Go to Sign Up
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
}

export default UserProfilePage;
