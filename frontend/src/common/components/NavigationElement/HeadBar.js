import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React, { useContext } from 'react';
import NavText from './NavText';
import { AuthContext } from '../../context/authcontext';

const defaultStyle = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

const coloredStyle = { ...defaultStyle, color: 'secondary.main' };

const HeadBar = () => {
  const { uid, isLogIn } = useContext(AuthContext);

  const NavLinks = isLogIn ? (
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
      <NavText to={`/${uid}/apps`} sx={defaultStyle}>
        MY POSTS
      </NavText>
      <NavText to={`/profile/${uid}`} sx={defaultStyle}>
        PROFILE
      </NavText>
    </Box>
  ) : (
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
      <NavText to='/login' sx={defaultStyle}>
        LOG IN
      </NavText>
      <NavText to='/register' sx={coloredStyle}>
        REGISTER
      </NavText>
    </Box>
  );
  return (
    <div>
      <AppBar position='fixed' elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <NavText to='/' sx={{ fontSize: 24 }}>
            TOURTS
          </NavText>
          {NavLinks}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};

export default HeadBar;
