import { Box, Button, Typography } from "@mui/material";
import "./CartProductCard.css";

function CartProductCard({ eachCardData, handleDeleteCartProduct }) {
  return (
    <Box
      key={eachCardData._id}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        backgroundColor: "#fff4e6",
        borderRadius: 2,
        boxShadow: 2,
        p: 2,
        mb: 2,
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ width: 80, height: 80, flexShrink: 0 }}>
        <img
          src={eachCardData.imageUrl}
          alt="Product picture"
          className="imgProductCart"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 200 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ color: "#592C28" }}
          noWrap
        >
          {eachCardData.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "#8C5042" }}>
          Description: {eachCardData.description.length > 100
          ? eachCardData.description.slice(0,100) + "..."
        : eachCardData.description}
        </Typography>
        <Typography variant="body2" sx={{ color: "#8C5042" }}>
          Country: {eachCardData.origin.country}
        </Typography>
        <Typography variant="body2" sx={{ color: "#8C5042" }}>
          Type: {eachCardData.type}
        </Typography>
      </Box>

        <Typography variant="body1" fontWeight="bold" sx={{ color: "#592C28" }}>
          {eachCardData.price} €
        </Typography>

        <Button
          variant="outlined"
          size="small"
          sx={{
            color: "#8C5042",
            borderColor: "#e8b3a7",
            backgroundColor: "#e79784",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#f5d5c3",
              borderColor: "#8C5042",
            },
          }}
          onClick={() => handleDeleteCartProduct(eachCardData._id)}
        >
          Delete
        </Button>
    </Box>
  );
}

export default CartProductCard;
