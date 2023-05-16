import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        padding: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        © 2023 Meow Shelter. All rights reserved.
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        Powered by React and Material-UI.
      </Typography>
      <Typography variant="body2">Designed by CKF</Typography>
    </Box>
  );
};

export default Footer;
