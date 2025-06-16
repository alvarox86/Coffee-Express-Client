import { Box, Typography } from "@mui/material"


function ReviewCard({review}) {
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
    </Box>
  )
}

export default ReviewCard