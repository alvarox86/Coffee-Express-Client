import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import service from "../../services/service.config";

function CreateReview({fetchReviews}) {
  const { productId } = useParams();
  const { loggedUserId, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    if (!isLoggedIn) {
        navigate("/signup")
        return;
    }

    console.log("Enviando formulario");

    const newReview = {
      username: loggedUserId,
      product: productId,
      rating,
      comment,
    };

    const storedToken = localStorage.getItem("authToken");
    try {
      if (storedToken) {
        await service.post(`/review`,newReview,
          {
            headers: {
              Authorization: `Bearer ${storedToken} `,
            },
          }
        );

        fetchReviews();

        /*Clean form */
        setRating("");
        setComment("");
      }
      console.log("reseña añadida correctamente");
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Box
      component="form"
      onSubmit={handleReviewSubmit}
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 4,
        borderRadius: 4,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Submit your review
      </Typography>

      <Stack spacing={3}>
        <TextField
          name="rating"
          label="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          fullWidth
          required
        />

        <TextField
          name="comment"
          label="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          multiline
          rows={3}
          required
        />
       
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ alignSelf: "flex-end" }}
        >
          Add Review
        </Button>
      </Stack>
    </Box>
  );
}

export default CreateReview;
