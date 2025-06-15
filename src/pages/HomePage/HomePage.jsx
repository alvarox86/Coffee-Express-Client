import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Stack,
  Container,
} from "@mui/material";
import CoffeeIcon from "@mui/icons-material/Coffee";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

/*Esto es para poner algunos cafes como destacados, debemos poner data de nuestro server, pero para que veas como quedaría */
const featuredProducts = [
  {
    id: 1,
    name: "Colombian Roast",
    price: "12.99",
    img: "/images/colombian.jpg",
  },
  {
    id: 2,
    name: "Ethiopian Blend",
    price: "14.99",
    img: "/images/ethiopian.jpg",
  },
  {
    id: 3,
    name: "House Espresso",
    price: "11.50",
    img: "/images/espresso.jpg",
  },
  { id: 4, name: "Decaf Delight", price: "13.25", img: "/images/decaf.jpg" },
];

function HomePage() {
  return (
    <Box>
      {/* Hero Section */}
      {/*AÑADIR NUESTRA IMAGEN DE FONDO AQUÍ CON CLOUDINARY */}
      <Box
        sx={{
          height: "90vh",
          backgroundImage: "hay que añadir una nueva",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          px: 2,
        }}
      >
        <Box sx={{ bgcolor: "rgba(0,0,0,0.5)", p: 4, borderRadius: 2 }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ fontSize: { xs: "2.5rem", md: "4rem" } }}
          >
            Coffee Express
          </Typography>
          <Typography variant="h5" sx={{ my: 2 }}>
            Bold flavors. Fast delivery. Coffee that powers your day.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#8B5042",
              color: "white",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#6c3a2f",
              },
            }}
          >
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Browse Our Coffees
            </Link>
          </Button>
        </Box>
      </Box>

      {/* Featured Products */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={4}>
          Featured Coffees
        </Typography>
        <Grid
          container
          spacing={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {featuredProducts.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
              <Card>
                <CardMedia component="img" height="200" image={product.img} />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography>{product.price} €</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" sx={{ color: "#8B5042" }}>
                    View More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Us */}
      <Box
        sx={{
          backgroundColor: "#F2E8DF",
          py: 6,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            mb={4}
            sx={{ color: "#592C27" }}
          >
            Why Choose Us
          </Typography>
          <Grid
            container
            spacing={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack alignItems="center" spacing={1}>
                <CoffeeIcon fontSize="large" sx={{ color: "#D9A689" }} />
                <Typography sx={{ color: "#261420" }}>
                  Specialty Beans
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack alignItems="center" spacing={1}>
                <LocalShippingIcon fontSize="large" sx={{ color: "#D9A689" }} />
                <Typography sx={{ color: "#261420" }}>24h Delivery</Typography>
              </Stack>
            </Grid>
           <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack alignItems="center" spacing={1}>
                <VerifiedIcon fontSize="large" sx={{ color: "#D9A689" }} />
                <Typography sx={{ color: "#261420" }}>
                  100% Guarantee
                </Typography>
              </Stack>
            </Grid>
           <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack alignItems="center" spacing={1}>
                <LocalCafeIcon fontSize="large" sx={{ color: "#D9A689" }} />
                <Typography sx={{ color: "#261420" }}>Eco-Friendly</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
