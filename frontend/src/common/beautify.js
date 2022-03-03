// beautify helper

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import theme from './theme';

const beautify = (Component) => {
  const Beautify = (props) => {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    );
  };
  return Beautify;
};

export default beautify;
