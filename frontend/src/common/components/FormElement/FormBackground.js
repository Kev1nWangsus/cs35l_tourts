import MuiPaper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';

const PaperRoot = styled(MuiPaper, {
  shouldForwardProp: (prop) => prop !== 'background' && prop !== 'padding',
})(({ theme, background, padding }) => ({
  backgroundColor: "common.white",
  ...(padding && {
    padding: theme.spacing(1),
  }),
}));

const FormBackground = (props) => {
  const { background, classes, className, padding = false, ...other } = props;

  return (
    <PaperRoot
      square
      elevation={3}
      background={background}
      padding={padding}
      className={className}
      {...other}
    />
  );
}

FormBackground.propTypes = {
  background: PropTypes.oneOf(['dark', 'light', 'main']).isRequired,
  classes: PropTypes.object,
  className: PropTypes.string,
  padding: PropTypes.bool,
};

export default FormBackground;