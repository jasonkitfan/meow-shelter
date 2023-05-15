import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import catKitten from './cat_kitten.jpeg';

function HeroSection() {

    let paragraph1 = "Welcome to Meow Shelter";
    let paragraph2 = "Looking for a furry friend? Adopting a cat not only gives you a loving companion, but it also helps provide a happy home for a cat in need."

  return (
    <Box
      sx={{
        backgroundImage: `url(${catKitten})`,
        backgroundSize: 'cover',
        height: 'calc(100vh - 64px)',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, .6)',
        mb: 3,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1" color={"white"} align="center" gutterBottom>
          {paragraph1}
        </Typography>
        <Typography variant="h5" align="center" color={"white"} paragraph>
          {paragraph2}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Learn More
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;