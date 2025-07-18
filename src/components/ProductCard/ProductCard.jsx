import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: "white",
        borderRadius: 1,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardMedia
        component="img"
        alt={product.name}
        height="200"
        src={product.imageUrl}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          fontWeight="bold"
          sx={{ color: "#592C27", minHeight: "3em", textAlign: "center" }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#261420",
            border: "0.5px solid #261420",
            padding: "4px 8px",
            textAlign: "center",
          }}
        >
          {product.price} €
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          component={Link}
          to={`/products/${product._id}`}
          size="small"
          sx={{ color: "#8B5042" }}
        >
          View More
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
