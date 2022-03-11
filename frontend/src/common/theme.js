// template of theme

import { green, grey, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      light: '#69696a',
      main: '#28282a',
      dark: '#1e1e1f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#dfff4f',
      main: '#49b02a',
      dark: '#1d4f0d',
      contrastText: '#fff',
    },
    warning: {
      main: '#ffc071',
      dark: '#ffb25e',
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[700],
    },
    success: {
      light: green[50],
      main: green[500],
      dark: green[700],
    },
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
  },
});

const fontHeader = {
  color: customTheme.palette.text.primary,
  fontWeight: customTheme.typography.fontWeightMedium,
  fontFamily: "'Roboto Condensed', sans-serif",
  textTransform: 'uppercase',
};

const theme = {
  ...customTheme,
  palette: {
    ...customTheme.palette,
    background: {
      ...customTheme.palette.background,
      default: customTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
  typography: {
    ...customTheme.typography,
    fontHeader,
    h1: {
      ...customTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...customTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...customTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...customTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...customTheme.typography.h5,
      fontSize: 20,
      fontWeight: customTheme.typography.fontWeightLight,
    },
    h6: {
      ...customTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...customTheme.typography.subtitle1,
      fontSize: 20,
    },
    body1: {
      ...customTheme.typography.body2,
      fontWeight: customTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...customTheme.typography.body1,
      fontSize: 14,
    },
  },
};

export default theme;
