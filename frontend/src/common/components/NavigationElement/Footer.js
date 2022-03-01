import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';
import Copyright from '../DecorationElement/Copyright';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        mx: 'auto',
        backgroundColor: 'primary.main'
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxWidth="sm">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ color: "#dde3ed" }}
        >
          <YouTubeIcon />
          <FacebookIcon />
          <InstagramIcon />
          <TwitterIcon />
        </Box>
        <Typography 
          variant="body1" 
          sx={{
            flexGrow: 1,
            textAlign: "center",
            color: "#dde3ed",
          }}
        >
          Have fun using Tourts to find your tennis mate!
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footer;