import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react';

const Copyright = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{color: "#dde3ed"}}
    >
      <Typography variant="body2">
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3000">
          Tourts
        </Link>
        {' 2022.'}
      </Typography>
    </Box>
  );
}

export default Copyright;