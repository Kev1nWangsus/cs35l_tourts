import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import MuiToolbar from '@mui/material/Toolbar';
import React from 'react';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

const HeadBar = () => {
  return (
    <div>
      <MuiAppBar position="fixed" elevation={0}>
        <MuiToolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'TOURTS'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/login"
              sx={rightLink}
            >
              {'Log In'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/register"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {'Register'}
            </Link>
          </Box>
        </MuiToolbar>
      </MuiAppBar>
      <MuiToolbar />
    </div>
  );
}

export default HeadBar;