import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import service from "../../services/service.config";

function CreateReview({ fetchReviews }) {
  const { productId } = useParams();
  const { loggedUserId, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    if (!isLoggedIn) {
      navigate("/signup");
      return;
    }

    if (!rating || rating < 1 || rating > 5) {
      alert("Please provide a rating between 1 and 5 stars.");
      return;
    }

    const newReview = {
      username: loggedUserId,
      product: productId,
      rating: rating,
      comment,
    };

    const storedToken = localStorage.getItem("authToken");
    try {
      if (storedToken) {
        await service.post(`/review`, newReview, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        fetchReviews();
        setRating(null);
        setComment("");

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleReviewSubmit}
      sx={{
        maxWidth: 1200,
        margin: "auto",
        padding: 4,
        borderRadius: 4,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 3, color: "#8B5042" }}
      >
        Submit your review
      </Typography>

      <Stack spacing={3}>
        <Stack spacing={1} direction="row" alignItems="center">
          <Typography component="legend" sx={{color: "#592c28"}}>Rating:</Typography>
          <Rating
            name="rating"
            value={rating}
            precision={1}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            size="large"
          />
        </Stack>

        <TextField
          name="comment"
          label="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          multiline
          rows={2}
          required
        />

        <Button
           sx={{
        alignSelf: "flex-end",
        backgroundColor: "#8B5042",
        color: "white",
        "&:hover": {
          backgroundColor: "#6c3a2f",
        },
      }}
      type="submit"
        >
          Add Review
        </Button>
      </Stack>
    </Box>
  );
}

export default CreateReview;
