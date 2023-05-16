import React from "react";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ContactForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={2}
      height="100%"
    >
      <Box sx={{ width: "100%", textAlign: "left" }}>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <LocationOnIcon sx={{ marginRight: 1 }} />
          <Typography variant="body1">
            30 Shing Tai Road, Chai Wan, Hong Kong
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <CallIcon sx={{ marginRight: 1 }} />
          <Typography variant="body1">+852 1234 5678</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <AccessTimeIcon sx={{ marginRight: 1 }} />
          <Typography variant="body1">7/24</Typography>
        </Box>
      </Box>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Message"
          variant="outlined"
          name="message"
          multiline
          rows={4}
          margin="normal"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Send
        </Button>
      </form>
    </Box>
  );
};

export default ContactForm;
