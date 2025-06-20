import { useEffect, useState, useContext } from "react";
import CartProductCard from "../../components/CartProductCard/CartProductCard";
import service from "../../services/service.config";
import { UserContext } from "../../context/profile.context";

import "./CartPage.css";
import {
  Box,
  Button,
  Divider,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PaymentIntent from "../../components/PaymentIntent/PaymentIntent";
import { AuthContext } from "../../context/auth.context";

function CartPage() {
  const [cartData, setCartData] = useState([]);
  const { getUserData } = useContext(UserContext);
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);
  const { loggedUserId } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUserId) {
      navigate("/signup");
      return;
    }
  }, []);

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
        p: { xs: 2, sm: 3, md: 4 },
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "flex-start",
        gap: { xs: 2, md: 4 },
      }}
    >
      <Paper
        elevation={4}
        sx={{
          backgroundColor: "#fff9f8",
          width: { xs: "90%", sm: "80%", md: "60%" },
          p: { xs: 2, md: 3 },
          maxWidth: 600,
          borderRadius: 2,
          height: "auto",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          maxHeight: { xs: 300, md: 500 },
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
              <Typography variant="h6">Your cart is empty</Typography>
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
                See our products here
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
      <Paper
        elevation={4}
        sx={{
          backgroundColor: "#fff9f8",
          maxWidth: 600,
          p: 3,
          borderRadius: 2,
          width: "100%",
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          margin: "0",
          padding: "0",
        }}
      >
        {/* Alert message */}
        <Box
          sx={{
            backgroundColor: "#ffefef",
            border: "1px solid #d9534f",
            color: "#a94442",
            borderRadius: 1,
            p: 2,
            fontSize: "0.9rem",
            textAlign: "center",
            fontWeight: "medium",
          }}
        >
          <strong>Notice:</strong> This is a practice application and a test
          payment environment. Please do not enter real payment information, as
          this is not a secure or live payment system.
        </Box>
        {showPaymentIntent === false ? (
          <Button
            variant="contained"
            onClick={() => setShowPaymentIntent(true)}
            sx={{
              backgroundColor: "#8C5042",
              color: "#fff",
              fontWeight: "bold",
              ":hover": { backgroundColor: "#592C28" },
            }}
          >
            Purchase
          </Button>
        ) : (
          <PaymentIntent productDetails={cartData} />
        )}
      </Paper>
    </Box>
  );
}

export default CartPage;
