import Link from '@mui/material/Link';
import React from 'react';
import {NavLink} from 'react-router-dom';

const NavText = (props) => {
  const {to, sx, variant, underline} = props;
  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <NavLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <Link
      component={renderLink}
      variant={variant || 'h6'}
      underline={underline || 'none'}
      color="inherit"
      to={to}
      sx={sx}
    >
      {props.children}
    </Link>
  )
}

export default NavText;
