import { Box, Button, Typography } from '@mui/material';

const donateButtonText = "Donate";
const title = "Give a big helping hand"
const text = "Your support can make a huge difference. Donate today and help us continue our mission to help the cats. Every contribution counts and helps us make a positive impact in our community. Thank you for your generosity!";

const Donation = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#ffffff',
        borderRadius: '6px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '80%',
        margin: '0 auto',
      }}
    >
      <Box
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          display: { sm: 'none', md: 'flex' },
        }}
      >
        <Box
          component="img"
          src="https://picsum.photos/300/200"
          alt="Random"
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '6px',
            marginBottom: '16px',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: '0',
            marginBottom: '0',
            width: '100%',
            paddingLeft: '3%',
            paddingRight: '3%'
          }}
        >
          <Typography variant="h2" sx={{paddingBottom: '3%'}}>{title}</Typography>
          <Typography variant="body1" sx={{paddingBottom: '3%'}}>{text}</Typography>
          <Button variant="contained" color="primary" sx={{ marginTop: '16px' }}>{donateButtonText}</Button>
        </Box>
      </Box>
      <Box
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          display: { sm: 'flex', md: 'none' },
        }}
      >
      </Box>
    </Box>
  );
};

export default Donation;