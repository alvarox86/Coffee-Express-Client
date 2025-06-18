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
    <Box sx={{ py: 5 }}>
      
      <Container sx={{Height: "100px"}}>
        <Typography
        variant="h2"
        fontWeight="bold"
        textAlign="center"
        sx={{ mb: 6, color: "#D9A689", letterSpacing: 1 }}
      >
        Our Coffee Selection
      </Typography>
        {filteredProducts.length > 0 ? (
          <Grid container spacing={4} justifyContent="center" >
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
            sx={{ color: "#8B5042" }}
          >
            No products available at the moment.
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default ProductsPage;
