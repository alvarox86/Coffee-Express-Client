import { Box, Button, Typography } from "@mui/material";

function ReviewCard({ review, loggedUserId, handleDeleteReview }) {
  
  //Comparamos el id del usuario logueado con el id del autor de la reseña
  const isAuthor = review.username._id === loggedUserId;
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        p: 2,
        mb: 2,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        {review.username.username}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        {review.rating}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        {review.comment}
      </Typography>
      
      {/*Si el autor es true entonces que se muestre el botón */}
      {isAuthor && (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ alignSelf: "flex-end" }}
           onClick={() => handleDeleteReview(review._id)}
        >
          Delete Review
        </Button>
      )}
    </Box>
  );
}

export default ReviewCard;
