import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; // import useHistory hook

function LoginAndRegister() {
  const navigate = useNavigate(); // initialize useHistory hook

  const handleRegisterClick = () => {
    // navigate to the "/register" page
    navigate("/register");
  };

  return (
    <div>
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          maxWidth: { xs: "100px", md: "200px" },
          textAlign: "center",
          gap: 2,
        }}
      >
        <Button variant="contained" color="secondary" sx={{ width: "100%" }}>
          Login
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ width: "100%" }}
          onClick={handleRegisterClick} // add onClick handler to the "Register" button
        >
          Register
        </Button>
      </Box>
    </div>
  );
}

export default LoginAndRegister;
