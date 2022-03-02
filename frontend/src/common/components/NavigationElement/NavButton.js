import Button from '@mui/material/Button';
import React from 'react';
import {NavLink} from 'react-router-dom';

const NavButton = (props) => {
  const {color, size, to, sx, variant} = props;
  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <NavLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <Button
      component={renderLink}
      color={color}
      size={size}
      variant={variant}
      to={to}
      sx={sx}
    >
      {props.children}
    </Button>
  )
}

export default NavButton;
