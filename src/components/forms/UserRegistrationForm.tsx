import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // import useHistory hook

import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import MicrosoftIcon from "@mui/icons-material/Window";
import {
  signInWithGoogle,
  registerWithEmailAndPassword,
} from "../../config/firebase";

const UserRegistrationForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // initialize useHistory hook

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create the user with Firebase auth
      await registerWithEmailAndPassword(username, email, password);

      // Log the user in
      console.log("User created");
      navigate("/");
    } catch (error: any) {
      // Handle any errors
      console.error("Error creating user:", error);
    }
  };

  const handleGoogleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("signing in with google");
    await signInWithGoogle();
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
          Create an account
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegistration}
          sx={{ width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            Or sign up with
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={handleGoogleLogin}
              startIcon={<GoogleIcon />}
              sx={{ borderColor: "grey.400" }}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<AppleIcon />}
              sx={{ borderColor: "grey.400" }}
            >
              Apple
            </Button>
            <Button
              variant="outlined"
              startIcon={<MicrosoftIcon />}
              sx={{ borderColor: "grey.400" }}
            >
              Microsoft
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default UserRegistrationForm;
