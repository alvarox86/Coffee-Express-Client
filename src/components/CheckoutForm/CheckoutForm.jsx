import { useEffect, useState, useContext } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Box, Button } from "@mui/material";
import service from "../../services/service.config";
import { UserContext } from "../../context/profile.context";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const { getUserData } = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  const handleSubmitPayNow = async () => {
    const storedToken = localStorage.getItem("authToken");
    try {
      await service.patch("/user/cart/cleancart", {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "lightgray",
        padding: { xs: 3, md: 6 },
        margin: { xs: 2, md: 10 },
        borderRadius: 2,
        maxWidth: 600,
        mx: "auto",
        boxShadow: 3,
      }}
    >
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading || !stripe || !elements}
          id="submit"
          sx={{
            mt: 4,

            backgroundColor: "#8C5042",
            fontWeight: "bold",
            ":hover": { backgroundColor: "#592C28" },
          }}
        >
          <span id="button-text" onClick={handleSubmitPayNow}>
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </Button>
        
        {/* Show any error or success messages */}
        
        {message && (
          <Box
            id="payment-message"
            sx={{
              mt: 2,
              color: "error.main",
              fontWeight: "medium",
              textAlign: "center",
            }}
          >
            {message}
          </Box>
        )}
      </form>
    </Box>
  );
}

export default CheckoutForm;
