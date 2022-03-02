import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import NavText from './NavText';

const loginStyle = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

const registerStyle= {...loginStyle, color: 'secondary.main'};

const HeadBar = () => {
  return (
    <div>
      <AppBar position="fixed" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <NavText to="/" sx={{ fontSize: 24 }}>TOURTS</NavText>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <NavText to="/login" sx={loginStyle}>LOG IN</NavText>
            <NavText to="/register" sx={registerStyle}>REGISTER</NavText>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default HeadBar;