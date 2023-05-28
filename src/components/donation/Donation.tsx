import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import PaymentFormWrapper from "./PaymentForm";

const donateButtonText = "Donate";
const title = "Give a big helping hand";
const text =
  "Your support can make a huge difference. Donate today and help us continue our mission to help the cats. Every contribution counts and helps us make a positive impact in our community. Thank you for your generosity!";

const Donation = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleDonateClick = () => {
    setShowPaymentForm(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "#ffffff",
        borderRadius: "6px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "80%",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          display: { sm: "none", md: "flex" },
        }}
      >
        <Box
          component="img"
          src="https://picsum.photos/300/200"
          alt="Random"
          sx={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderRadius: "6px",
            marginBottom: "16px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: "0",
            marginBottom: "0",
            width: "100%",
            paddingLeft: "3%",
            paddingRight: "3%",
          }}
        >
          {!showPaymentForm && <Typography variant="h2">{title}</Typography>}
          {!showPaymentForm && <Typography variant="body1">{text}</Typography>}
          {!showPaymentForm && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleDonateClick}
            >
              {donateButtonText}
            </Button>
          )}
          {showPaymentForm && <Typography variant="h4">Donate</Typography>}
          {showPaymentForm && <PaymentFormWrapper />}
        </Box>
      </Box>
    </Box>
  );
};

export default Donation;
