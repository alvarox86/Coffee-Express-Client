import { Box, Button, Typography, Rating } from "@mui/material";

function ReviewCard({ review, loggedUserId, handleDeleteReview }) {
  //Comparamos el id del usuario logueado con el id del autor de la reseña
  const isAuthor = review.username._id === loggedUserId;

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        p: 2,
        mb: 3,
        p: { xs: 2, md: 2 },
        backgroundColor: "#fafafa",
        boxShadow: 1,
      }}
    >
      <Box sx={{ border: "1px solid #ddd", padding: "10px" }}>
        <Box sx={{ border: "1px solid #ddd", padding: "5px", marginBottom: "10px", display: "flex", alignItems: "center" }}>
          <Typography component="legend" sx={{color: "#592c28"}}>
            Username:{" "}
          </Typography>
          <Typography
            variant="h6"
           sx={{  component:"legend", color: "#592c28", lineHeight: 1 }}
          >
            {review.username.username}
          </Typography>
        </Box>
        <Rating
          value={review.rating}
          readOnly
          precision={1}
          size="small"
          sx={{ mb: 1 }}
        />
        <Typography variant="body2" sx={{ mb: 2, color: "#261420" }}>
          {review.comment}
        </Typography>

        {/*Si el autor es true entonces que se muestre el botón */}
        {isAuthor && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDeleteReview(review._id)}
          >
            Delete 
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default ReviewCard;
