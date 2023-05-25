import React from "react";
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
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
} from "../../config/firebase";

const UserRegistrationForm: React.FC = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // handle form submission

    // Get the form data
    const usernameInput = (e.target as HTMLFormElement).elements.namedItem(
      "username"
    );
    const username =
      usernameInput instanceof HTMLInputElement ? usernameInput.value : "";
    const emailInput = (e.target as HTMLFormElement).elements.namedItem(
      "email"
    );
    const email =
      emailInput instanceof HTMLInputElement ? emailInput.value : "";
    const passwordInput = (e.target as HTMLFormElement).elements.namedItem(
      "password"
    );
    const password =
      passwordInput instanceof HTMLInputElement ? passwordInput.value : "";

    try {
      // Create the user with Firebase auth
      const userCredential: any = await logInWithEmailAndPassword(
        email,
        password
      );

      // Update the user's display name with the username
      await userCredential.user?.updateProfile({
        displayName: username,
      });

      // Log the user in
      console.log("User created:", userCredential.user);
    } catch (error) {
      // Handle any errors
      console.error("Error creating user:", error);
    }
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
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="current-password"
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
