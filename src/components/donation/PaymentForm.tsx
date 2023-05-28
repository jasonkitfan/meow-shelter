import React, { useState } from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { stripePublicKey } from "../../config/secret";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";

const stripePromise = loadStripe(stripePublicKey);

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("handling payment");
    event.preventDefault();

    setLoading(true);

    const cardElement = elements?.getElement(CardElement);

    const { error, paymentMethod } = await stripe!.createPaymentMethod({
      type: "card",
      card: cardElement!,
    });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    if (!amount) {
      return;
    }
    try {
      const response = await axios.post(
        "https://asia-east2-meow-shelter.cloudfunctions.net/app/shelter/donate",
        {
          amount: (Number(amount) * 100).toString(),
          paymentMethodId: paymentMethod?.id,
        }
      );
      console.log("success");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handlePayment}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="number"
            label="Amount"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <div id="card-errors" role="alert"></div>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            id="submit"
          >
            Submit Payment
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const PaymentFormWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentFormWrapper;
