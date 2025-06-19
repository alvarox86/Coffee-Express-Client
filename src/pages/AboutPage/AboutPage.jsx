import { Box, Container, Typography, Grid, Paper } from "@mui/material";

function AboutPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#261420",
        color: "#F2E8DF",
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          fontWeight="900"
          textAlign="center"
          gutterBottom
          sx={{ letterSpacing: 3, mb: 6, color: "#F2E8DF" }}
        >
          About Us
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: "#F2E8DF",
                borderRadius: 3,
                p: { xs: 3, md: 5 },
                color: "#261420",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                },
              }}
            >
              <Typography
                variant="h4"
                fontWeight="700"
                mb={2}
                sx={{ color: "#8c5042" }}
              >
                Our Web App
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.7, opacity: 0.9 }}
              >
                Founded in 2025, Coffee Express starts as a test ecommerce in
                development with a passion for bringing the best coffee
                experiences to our community. Our main functionalities are
                browsing products...
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: "#F2E8DF",
                borderRadius: 3,
                p: { xs: 3, md: 5 },
                color: "#261420",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                },
              }}
            >
              <Typography
                variant="h4"
                fontWeight="700"
                mb={2}
                sx={{ color: "#8c5042" }}
              >
                Our Values (EJEMPLO)
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.7, opacity: 0.9 }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi a ducimus, voluptatem ex veniam alias? Tenetur iusto repellendus tempore eligendi ipsa nesciunt quisquam libero, saepe necessitatibus provident rem harum voluptatibus.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: "#F2E8DF",
                borderRadius: 3,
                p: { xs: 3, md: 5 },
                color: "#261420",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                },
              }}
            >
              <Typography
                variant="h4"
                fontWeight="700"
                mb={2}
                sx={{ color: "#8c5042" }}
              >
                The Team
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.7, opacity: 0.9 }}
              >
                This platform was developed by Álvaro and María, two Ironhack
                students collaborating on their first full-stack web
                application. Throughout the project, we strengthened our
                teamwork skills and deepened our understanding of technologies
                such as React, Express, MongoDB, and RESTful APIs. The site
                serves as both a learning experience and a showcase of key
                functionalities we’ve implemented, including user
                authentication, product management, and responsive design.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutPage;
