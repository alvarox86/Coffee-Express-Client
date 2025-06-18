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


const featuredProducts = [
  {
    id: 1,
    name: "Colombian Roast",
    price: "17.99",
    img: "https://res.cloudinary.com/dotfm1go0/image/upload/v1750252601/71GgSCd4gHL_c6fb5h.jpg",
  },
  {
    id: 2,
    name: "Ethiopian Blend",
    price: "14.99",
    img: "https://res.cloudinary.com/dotfm1go0/image/upload/v1750253305/SM103691149-11_rgx0rs.jpg",
  },
  {
    id: 3,
    name: "House Espresso",
    price: "11.50",
    img: "https://res.cloudinary.com/dotfm1go0/image/upload/v1750252759/signature-brew_vdgd0l.jpg",
  },
  { id: 4,
    name: "Decaf Delight",
    price: "13.25",
    img: "https://res.cloudinary.com/dotfm1go0/image/upload/v1750252861/lenis_produkt_decaf-1_zasppo.jpg" 
  },
];

function HomePage() {
  return (
    <Box sx={{ backgroundColor: "#261420", minHeight: "100vh" }}>
      
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "90vh",
          backgroundImage: 'url("https://res.cloudinary.com/dotfm1go0/image/upload/v1750242750/cup-of-coffee-with-nature-sykdhzd5xzwd99pt_iexcul.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: { xs: 2, md: 4 },
        }}
      >
        <Box sx={{ bgcolor: "rgba(0,0,0,0.5)", p: 4, borderRadius: 2 }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ fontSize: { xs: "2.5rem", md: "4rem" },
              color: "#F2E8DF" }}
          >
            Coffee Express
          </Typography>
          <Typography variant="h5" sx={{ my: 2, color: "#F2E8DF" }}>
            Bold flavors. Fast delivery. Coffee that powers your day.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor:"rgb(159, 122, 101)",
              color: "#261420",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#592c28",
                color: "#F2E8DF"
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
      <Container sx={{ py: 6}}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={4} sx={{ color: "F2E8DF" }}>
          Featured Coffees
        </Typography>
        <Grid
          container
          spacing={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {featuredProducts.map((product) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3, md: 4 }} key={product.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia component="img" width="200" image={product.img} alt={product.name} />
                <CardContent sx={{ flexGrow: 1}}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography>{product.price} €</Typography>
                </CardContent>
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
        <Container sx={{color: "#8c5042"}}>
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
            sx={{ display: "flex", justifyContent: "center"}}
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
