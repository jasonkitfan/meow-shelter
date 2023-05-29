import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    sendEmail();
  };

  const sendEmail = async () => {
    await axios
      .post(
        "https://asia-east2-meow-shelter.cloudfunctions.net/app/shelter/email",
        {
          name: name,
          email: email,
          content: content,
        }
      )
      .then((response) => {
        console.log("success");
        console.log(response.data);
        setName("");
        setEmail("");
        setContent("");
      })
      .catch((error) => {
        console.log(error);
      });
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          margin="normal"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          value={content}
          label="Message"
          variant="outlined"
          name="message"
          multiline
          rows={4}
          margin="normal"
          fullWidth
          required
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Send
        </Button>
      </form>
    </Box>
  );
};

export default ContactForm;
