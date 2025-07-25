import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function ServerErrorPage() {
   const navigate = useNavigate();
  return (
      <Box
      sx={{
        minHeight: "80vh",
        bgcolor: "#261420",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "#ff9d23", mb: 2 }} />
      <Typography
        variant="h2"
        sx={{ fontWeight: 700, color: "#fef9e1", mb: 1 }}
      >
        500
      </Typography>
      <Typography variant="h5" sx={{ color: "#e5d0ac", mb: 2 }}>
        Unexpected Error 
      </Typography>
      <Typography sx={{ color: "#e5d0ac", mb: 4, maxWidth: 400 }}>
        An error occurred and your request couldn't be completed. Please try again.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          bgcolor: "#ff9d23",
          color: "#261420",
          fontWeight: 600,
          px: 4,
          py: 1.5,
          borderRadius: "12px",
          "&:hover": {
            bgcolor: "#c14600",
          },
        }}
      >
        Go back to Home
      </Button>
    </Box>
  )
}

export default ServerErrorPage