import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#fff4e6", borderRadius: 3, boxShadow: 3, transition: "all 0.3s ease", "&:hover": { transform: "scale(1.03)", boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)" } }}>
      <CardMedia
        component="img"
        alt={product.name}
        height="200"
        image={
          product.imgUrl ||
          "https://res.cloudinary.com/dotfm1go0/image/upload/v1749917582/default-image_600_u1nizl.webp"
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h6" fontWeight="bold" sx={{ color: "#592C27" }}>
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "#8B5042" }}>
          {product.price} €
        </Typography>
      </CardContent>
      <CardActions>
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
