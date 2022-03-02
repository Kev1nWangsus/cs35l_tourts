import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import NavButton from '../NavigationElement/NavButton';


const backgroundImage =
  'https://recreation.ucla.edu/sites/default/files/styles/header_image/public/2021-03/facilities_LATC_1156x420.jpg?itok=3KRs1EdO'

const HomeSection = styled('section')(({ theme }) => ({
  color: theme.palette.common.white,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    height: '100vh',
    minHeight: 500,
    maxHeight: 1300,
  },
}));

const FixedBox = styled(Box)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
})

const HomeBackground = () => {
  return (
    <HomeSection>
      <Container 
        sx={{
          mt: 3,
          mb: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          style={{ display: 'none' }}
          src={backgroundImage}
          alt="increase priority"
        />
        <Typography color="inherit" align="center" variant="h2" marked="center">
          Welcome to Tourts!
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
        >
          Find nearby tennis player or initiate your appointment!
        </Typography>
        <NavButton 
          color="secondary" 
          size="large" 
          to="/register" 
          variant="contained" 
          sx={{ minWidth: 200, mt: 10 }}
        >
          Register
        </NavButton>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Powered by Tourts Team
        </Typography>
        
        <FixedBox 
          sx={{
            backgroundColor: 'common.black',
            opacity: 0.5,
            zIndex: -1,
          }}
        />
        <FixedBox 
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundColor: '#659fad', 
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: -2,
          }} 
        />
      </Container>
    </HomeSection>
  );
}

export default HomeBackground;