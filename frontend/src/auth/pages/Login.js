import { yupResolver } from '@hookform/resolvers/yup';
import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormContainer from '../../common/components/FormElement/FormContainer';
import NavText from '../../common/components/NavigationElement/NavText';
import { AuthContext } from '../../common/context/authcontext';
import { useHttpClient } from '../../common/hooks/http-hook';

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};

const Login = () => {
  const validator = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be at least 6 characters')
      .max(30, 'Password should be at most 30 characters'),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validator),
  });

  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttpClient();

  const onSubmit = async (data) => {
    // await server response for registration
    const writeStorage = data.remember;
    delete data.remember;
    const [err, response] = await sendRequest(
      'http://localhost:5000/api/users/login',
      'POST',
      JSON.stringify(data),
      { 'Content-Type': 'application/json' }
    )
      .then((response) => [null, response])
      .catch((err) => [err, null]);

    console.log('data', response);

    if (err) {
      console.log('error', err);
    } else {
      if (writeStorage) localStorage.setItem('user', response.user.id);
      auth.login(response.user.id);
    }
  };

  return (
    <React.Fragment>
      <FormContainer>
        <Typography
          variant='h3'
          gutterBottom
          marked='center'
          align='center'
          sx={{ mb: 4 }}
        >
          Log In
        </Typography>

        {error && (
          <Typography marked='center' align='center' color='red'>
            {error}
          </Typography>
        )}

        <Backdrop
          sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color='inherit' />
        </Backdrop>

        <TextField
          required
          id='email'
          name='email'
          label='E-mail'
          fullWidth
          margin='normal'
          {...register('email')}
          error={errors.email ? true : false}
          helperText={errors.email?.message}
        />

        <TextField
          required
          id='password'
          name='password'
          label='Password'
          type='password'
          fullWidth
          margin='normal'
          {...register('password')}
          error={errors.password ? true : false}
          helperText={errors.password?.message}
        />

        <FormControlLabel
          {...register('remember')}
          control={<Checkbox defaultChecked />}
          label='Remember me'
          name='remember'
          id='remember'
        />
        <Grid item xs={12} sm={12} align='center' justify='center'>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant={'contained'}
            size='large'
            sx={{ mt: 5, width: 0.8 }}
          >
            Log In
          </Button>
        </Grid>

        <Typography variant='body2' align='center' sx={{ mt: 2 }}>
          {'Not a member yet? '}
          <NavText
            to='/register'
            align='center'
            underline='always'
            variant='inherit'
          >
            Register here
          </NavText>
        </Typography>
      </FormContainer>
    </React.Fragment>
  );
};

export default Login;
