import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import * as React from 'react';
import FormBackground from './FormBackground';

const FormContainer = (props) => {
  const { children } = props;

  return (
    <Box sx={{display: 'flex'}}>
      <Container maxWidth="sm">
        <Box sx={{ mt: 7, mb: 12 }}>
          <FormBackground
            background="light"
            justify="center"
            sx={{ py: { xs: 4, md: 8 }, px: { xs: 3, md: 6 }, height: 1 }}
          >
            {children}
          </FormBackground>
        </Box>
      </Container>
    </Box>
  );
}

FormContainer.propTypes = {
  children: PropTypes.node,
};

export default FormContainer;