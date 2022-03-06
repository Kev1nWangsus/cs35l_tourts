import { Button, Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AuthContext } from '../../common/context/authcontext';

const Profile = () => {
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('user');
    console.log('Successfully erased cache!');
    auth.logout();
    console.log('Successfully logged out!');
  };

  return (
    <React.Fragment>
      <Box
        height='100vh'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography invariant='h2'>Profile page under construction</Typography>
        <Button
          onClick={handleLogout}
          variant={'contained'}
          size='large'
          sx={{ mt: 5, width: 0.8 }}
        >
          Log out
        </Button>
      </Box>
    </React.Fragment>
  );
};
export default Profile;
