import { useEffect, useState, useContext } from "react";
import CartProductCard from "../../components/CartProductCard/CartProductCard";
import service from "../../services/service.config";
import { UserContext } from "../../context/profile.context";

import "./CartPage.css";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function CartPage() {
  const [cartData, setCartData] = useState([]);
  const { getUserData } = useContext(UserContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const storedToken = localStorage.getItem("authToken");

    try {
      if (storedToken) {
        const response = await service.get(`/user/cart`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setCartData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCartProduct = async (productId) => {
    try {
      await service.patch(`/user/cart/${productId}/remove`);
      getData();
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#261420",
        p: 4,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center", //Cambiar esto para meter al lado lo de los pagos
        alignItems: "flex-start",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          backgroundColor: "#F2E8DF",
          maxWidth: 600,
          p: 3,
          borderRadius: 2,
          width: "100%",
          height: "70vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 2, color: "#592C28", textAlign: "center" }}
        >
          Your Cart
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {cartData.length === 0 ? (
            <Box
              variant="h6"
              sx={{
                color: "#8C5042",
                fontWeight: "medium",
                marginTop: "50px",
                textAlign: "center",
              }}
            >
              <Typography variant="h6" >Your cart is empty</Typography>
              <Button
                variant="outlined"
                component={Link}
                to="/products"
                sx={{
                  mt: 2,
                  color: "#8C5042",
                  borderColor: "#8C5042",
                  textTransform: "none",
                  fontWeight: "bold",
                  backgroundColor: "#f2e8df",
                }}
              >
                Add products here
              </Button>
            </Box>
          ) : (
            cartData.map((eachCardData) => (
              <Box key={eachCardData._id}>
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#F2E8DF",
                    borderRadius: 2,
                    border: 1,
                    p: 2,
                    mb: 2,
                    boxShadow: 2,
                  }}
                >
                  <CartProductCard
                    eachCardData={eachCardData}
                    handleDeleteCartProduct={handleDeleteCartProduct}
                  />
                </ListItem>
                <Divider />
              </Box>
            ))
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default CartPage;
