// in "src/components/PaymentSuccess.jsx"

import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import service from "../../services/service.config";
import { Box, Button, Typography } from "@mui/material";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    handleUseEffect();
  }, []);

  const handleUseEffect = async () => {
    // below is a way to extract queries from the search queries.
    // unfortunately, react-router-dom doesn't come with a proper way to extract them, similar to useParams
    const clientSecret = new URLSearchParams(location.search).get(
      "payment_intent_client_secret"
    );
    const paymentIntentId = new URLSearchParams(location.search).get(
      "payment_intent"
    );

    const paymentIntentInfo = {
      clientSecret: clientSecret,
      paymentIntentId: paymentIntentId,
    };

    try {
      await service.patch("/payment/update-payment-intent", paymentIntentInfo);
      // !IMPORTANT: Adapt the request structure to the one in your project (services, .env, auth, etc...)

      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#261420",
        }}
      >
        <Typography variant="h5" sx={{ color: "#F2E8DF" }}>
          ⏳ Updating payment...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#261420",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#F2E8DF",
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ mb: 2, color: "#261420" }}
        >
          🎉 Thank you for your order!
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, color: "#592C28" }}>
          Your order is on the way.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#8C5042",
            "&:hover": {
              backgroundColor: "#592C28",
            },
          }}
        >
          Go back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentSuccess;
