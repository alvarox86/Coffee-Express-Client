import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "../../components/ProductCard/ProductCard";

import { Box, Container, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import service from "../../services/service.config";


function ProductsPage({products, setProducts}) {
 

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await service.get(`/product`);
            setProducts(response.data);
        } catch (error) {
            console.log(error)
        }

    };
    fetchProducts();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container>
        <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        sx={{mb: 4, color: "#8B5042"}}>
            Our Coffee Selection
        </Typography>

         {products && products.length > 0 && (
          <Grid container spacing={4} justifyContent="center">
            {products.map((product) => (
             <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
         {/* 🕳️ Para cuando no hay productos */}
        {products && products.length === 0 && (
          <Typography variant="h6" textAlign="center" mt={4} sx={{ color: "#8B5042" }}>
            No products available at the moment.
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default ProductsPage;
