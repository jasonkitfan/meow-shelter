import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import PaymentFormWrapper from "./PaymentForm";
import image_for_donate from "./image_for_donate.jpg";

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
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          width: "100%",
          display: "flex",
        }}
      >
        <Box
          component="img"
          src={image_for_donate}
          alt="Random"
          sx={{
            width: { xs: "100%", sm: "50%" },
            height: "auto",
            objectFit: "cover",
            borderRadius: "6px",
            marginBottom: { xs: "16px", sm: "0" },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "0",
            width: "100%",
            marginLeft: { sm: "3%" },
            marginRight: { sm: "3%" },
            marginTop: { xs: "16px", sm: "0" },
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
