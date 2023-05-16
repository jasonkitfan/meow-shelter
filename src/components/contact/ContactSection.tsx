import { Box, Typography } from "@mui/material";
import ContactForm from "./ContactForm";

const ContactSection: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      alignItems={{ xs: "center", md: "flex-start" }}
      justifyContent={{ xs: "center", md: "flex-start" }}
      height="100vh"
      paddingTop={{ lg: 10, md: 5 }}
      paddingBottom={{ lg: 10, md: 5 }}
      paddingLeft="10%"
      paddingRight="10%"
    >
      <Box
        sx={{
          width: "100%",
          height: { xs: "50vh", md: "100%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={{ marginBottom: 2 }}>
          Contact Us
        </Typography>
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.768780652608!2d114.22661061494482!3d22.26610028534392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34040120005c2f4d%3A0x5112a5bde8c9b2c9!2s30%20Shing%20Tai%20Rd%2C%20Chai%20Wan%2C%20Hong%20Kong!5e0!3m2!1sen!2sus!4v1651015642662!5m2!1sen!2sus"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: { xs: "50vh", md: "100%" },
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <ContactForm />
      </Box>
    </Box>
  );
};

export default ContactSection;
