import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";

import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import service from "../../services/service.config";

function ProductsPage({ products, setProducts, searchProducts }) {
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchProducts.toLowerCase());
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await service.get(`/product`);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 3, sm: 5 },
        px: { xs: 1, sm: 0 },
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "#F2E8DF",
          borderRadius: 2,
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          px: { xs: 2, md: 4 },
          py: 6,
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          sx={{
            mb: { xs: 4, sm: 6 },
            color: "#261420",
            letterSpacing: 1,
            textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          Our Coffee Selection
        </Typography>
        {filteredProducts.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {filteredProducts.map((product) => (
              <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="h6"
            textAlign="center"
            mt={4}
            sx={{ color: "#261420" }}
          >
            No products available at the moment.
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default ProductsPage;
