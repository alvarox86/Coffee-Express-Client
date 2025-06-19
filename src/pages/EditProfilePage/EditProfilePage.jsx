import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, Link } from "react-router-dom";
import service from "../../services/service.config";
import { UserContext } from "../../context/profile.context";
import { Box, Button, TextField, Typography } from "@mui/material";

function EditProfilePage() {
  const navigate = useNavigate();

  const { loggedUserId } = useContext(AuthContext);
  const { getUserData } = useContext(UserContext);
  const [isUploading, setIsUploading] = useState(false);

  const [usernameInputValue, setUsernameInputValue] = useState("");
  const [phoneInputValue, setPhoneInputValue] = useState("");
  const [adressInputValue, setAdressInputValue] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const handleUsernameChange = (event) => {
    setUsernameInputValue(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhoneInputValue(event.target.value);
  };
  const handleAdressChange = (event) => {
    setAdressInputValue(event.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const storedToken = localStorage.getItem("authToken");

    try {
      if (storedToken) {
        const response = await service.get(`/user`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setUsernameInputValue(response.data.username);
        setPhoneInputValue(response.data.phone);
        setAdressInputValue(response.data.adress);
        setImageUrl(response.data.profilepicture);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* if(userUserName === null || userPhone === null || userProfilePicture === null || userAdress === null){
        <CircularProgress />
    } */

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    const updatedProfile = {
      username: usernameInputValue,
      phone: phoneInputValue,
      adress: adressInputValue,
      profilepicture: imageUrl,
    };

    try {
      await service.patch(`/user`, updatedProfile, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      getUserData();
      navigate(`/userprofile/${loggedUserId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await service.post(`/upload`, uploadData);

      setImageUrl(response.data.imageUrl);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmitForm}
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        marginBottom: "40px"
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        sx={{color: "#592c28"}}
        gutterBottom
      >
        Update your Profile
      </Typography>

      <TextField
        label="Username"
        name="username"
        value={usernameInputValue}
        onChange={handleUsernameChange}
        fullWidth
      />

      <TextField
        label="Phone"
        name="phone"
        value={phoneInputValue}
        onChange={handlePhoneChange}
        fullWidth
      />

      <TextField
        label="Address"
        name="address"
        value={adressInputValue}
        onChange={handleAdressChange}
        fullWidth
      />

      <Box>
        <Typography variant="body1" mb={1} sx={{ color: "black" }}>
          Change your user profile picture:
        </Typography>
        <input
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
          style={{ marginBottom: "8px" }}
        />
        {isUploading && <Typography>... uploading image</Typography>}
        {imageUrl && (
          <Box mt={1}>
            <img
              src={imageUrl}
              alt="profile"
              width={200}
              style={{ borderRadius: 4 }}
            />
          </Box>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            alignSelf: "flex-end",
            backgroundColor: "#D9A689",
            color: "white",
            "&:hover": {
              backgroundColor: "#6c3a2f",
            },
          }}
        >
          Edit your profile
        </Button>

        <Link
          to={`/userprofile/${loggedUserId}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              alignSelf: "flex-end",
              backgroundColor: "#D9A689",
              color: "white",
              "&:hover": {
                backgroundColor: "#6c3a2f",
              },
            }}
          >
            Go back
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default EditProfilePage;
