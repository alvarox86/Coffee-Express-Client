import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  ListItem,
  List,
  Link as MuiLink,
} from "@mui/material";


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
                sx={{ color: "#261420" }}
              >
                Our Web App
              </Typography>
              <Typography variant="body1" paragraph>
                Founded in 2025, <strong>Coffee Express</strong> is a
                next-generation e-commerce platform focused on offering
                high-quality coffee products through a smooth and user-friendly
                online experience.
              </Typography>

              <Typography variant="body1" paragraph>
                Our core features are designed to cover the full online shopping
                cycle:
              </Typography>

              <List sx={{ listStyleType: "disc", pl: 4 }}>
                <ListItem sx={{ display: "list-item" }}>
                  Users can{" "}
                  <strong>browse a wide catalog of coffee products</strong>,{" "}
                  <strong>add them to their cart</strong>, and{" "}
                  <strong>complete purchases securely</strong>.
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  After a purchase, customers can <strong>leave reviews</strong>{" "}
                  to help other users make informed decisions.
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  <strong>Sellers</strong> have access to their own product
                  management tools, allowing them to{" "}
                  <strong>create, edit, and delete listings</strong> easily,
                  ensuring the store is always up to date.
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  Every registered user has a{" "}
                  <strong>personal profile page</strong>, where they can{" "}
                  <strong>update personal data</strong>,{" "}
                  <strong>track their activity</strong>, and{" "}
                  <strong>manage their cart</strong>.
                </ListItem>
              </List>

              <Typography variant="body1" paragraph>
                Coffee Express combines a clean interface with powerful
                functionalities, offering both customers and vendors the tools
                they need to interact efficiently in a dynamic e-commerce
                environment. We're committed to continuous improvement to
                deliver the best possible digital shopping experience in the
                coffee market.
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
                sx={{ color: "#261420" }}
              >
                The Team
              </Typography>
              <Typography variant="body1" paragraph>
                This platform was developed by <MuiLink href="https://github.com/alvarox86" underline="hover" sx={{ fontWeight: "bold" }}  target="_blank"
          rel="noopener noreferrer"><strong>Álvaro</strong></MuiLink > and{" "}
                <MuiLink href="https://github.com/mariajs99" underline="hover" sx={{ fontWeight: "bold" }}  target="_blank"
          rel="noopener noreferrer"><strong>María</strong></MuiLink>, two passionate students from Ironhack,
                as part of their first full-stack web application project. The
                goal was to apply and consolidate knowledge acquired during the
                bootcamp while working in a collaborative and agile development
                environment.
              </Typography>

              <Typography variant="body1" paragraph>
                Throughout the development process, we enhanced our{" "}
                <strong>teamwork and problem-solving skills</strong>, while
                deepening our understanding of core web technologies such as{" "}
                <strong>React</strong> for the frontend,
                <strong> Express</strong> and <strong>Node.js</strong> for the
                backend, <strong>MongoDB</strong> for data persistence, and the
                use of <strong>RESTful APIs</strong> for client-server
                communication.
              </Typography>

              <Typography variant="body1" paragraph>
                This web application features{" "}
                <strong>user authentication</strong>,{" "}
                <strong>role-based access</strong>,
                <strong> product management</strong> for both customers and
                vendors, and a fully <strong>responsive UI</strong>. We also
                integrated third-party services such as <strong>Stripe</strong>{" "}
                for payments and
                <strong> Cloudinary</strong> for image storage, ensuring the app
                mirrors real-world e-commerce functionality.
              </Typography>

              <Typography variant="body1" paragraph>
                More than just a final project, this platform stands as a
                practical showcase of our technical and creative growth
                throughout the bootcamp, and a solid foundation for our future
                development careers.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutPage;
