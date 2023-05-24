import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  const [isShortContent, setIsShortContent] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      const contentHeight = window.innerHeight - document.body.offsetHeight;
      setIsShortContent(contentHeight > 0);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        paddingTop: 2,
        paddingBottom: 2,
        textAlign: "center",
        width: "100%",
        position: isShortContent ? "fixed" : "static",
        bottom: isShortContent ? 0 : "auto",
        left: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80px",
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
