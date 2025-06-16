import { Box, Button, Divider, Paper, Typography } from "@mui/material";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import CreateReview from "./CreateReview";
import { AuthContext } from "../../context/auth.context";

function ProductDetailsPage() {
  const { productId } = useParams();
  const {loggedUserId} = useContext(AuthContext)

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);


    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/product/${productId}`
        );
        setProduct(productResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewResponse = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/review/product/${productId}`
        );
        setReviews(reviewResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

 // Esto  borra la review del estado
const handleDeleteReview = async (reviewId) => {
  const storedToken = localStorage.getItem("authToken");
  try {
    await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/review/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      }
    });
    /*Aqui actualizamos el estado de reviews filtrando y eliminando la review que tenga ese reviewId. */
    setReviews((prevReviews) => {
      const updatedReviews = prevReviews.filter((review) => {
        return review._id !== reviewId; //Si la review del id que está comprobando es diferente a la que quiero eliminar, la dejamos en reviews
      })
      return updatedReviews; //Devolvemos el array nuevo sin la reseña que queremos borrar.
    } )
  } catch (error) {
    console.log(error)
  }
}
  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [productId]);

  if (!product) return <Typography>Products not found</Typography>;
  if (!reviews) return <Typography>Reviews not found </Typography>;

  
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: "auto" }}>
      {/* Sección de producto */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 4,
          mb: 5,
        }}
      >
        <Box
          component="img"
          src={product.imageUrl}
          alt={product.name}
          sx={{
            width: { xs: "100%", sm: "40%" },
            borderRadius: 2,
            objectFit: "cover",
            maxHeight: 400,
          }}
        />
        <Paper elevation={3} sx={{ flex: 1, p: 3 }}>
          <Typography variant="h4" fontWeight="bold">
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="subtitle1" fontWeight="medium" sx={{ mt: 2 }}>
            Precio: ${product.price}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
            Region: {product.origin.region}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
            Country: {product.origin.country}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
            Type: {product.type}
          </Typography>

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
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Add Cart
            </Link>
          </Button>
        </Paper>
      </Box>

      {/* Divider */}
      <Divider sx={{ mb: 4 }} />

      {/* Sección de Reviews y formulario de reviews */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Box>
          <Box>
            <CreateReview fetchReviews={fetchReviews}/>
          </Box>
          <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Reviews
          </Typography>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewCard key={index} 
              review={review} 
              loggedUserId={loggedUserId}
              handleDeleteReview={handleDeleteReview}
              />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No comments yet.
            </Typography>
          )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetailsPage;
