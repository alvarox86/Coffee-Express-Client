// in "src/components/PaymentIntent.jsx"

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../CheckoutForm/CheckoutForm";
import service from "../../services/service.config";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); 

function PaymentIntent({ productDetails }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    handleUseEffect()
  }, []);
  
  const handleUseEffect = async () => {
  const response = await service.post(`/payment/create-payment-intent`, productDetails)
    // !IMPORTANT: Adapt the request structure to the one in your project (services, .env, auth, etc...)

    setClientSecret(response.data.clientSecret)
  }

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default PaymentIntent;