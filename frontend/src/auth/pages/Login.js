import {yupResolver} from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import FormContainer from '../../common/components/FormElement/FormContainer';
import Footer from '../../common/components/NavigationElement/Footer';
import HeadBar from '../../common/components/NavigationElement/HeadBar';
import NavText from '../../common/components/NavigationElement/NavText';

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const validator = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password should be at least 6 characters")
      .max(30, "Password should be at most 30 characters"),
  });
  const { 
    handleSubmit, 
    register, 
    control, 
    formState: {errors} 
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validator)
  });
  
  const onSubmit = (data) => {
    console.log(data);
    // stringfy data
    // send request
    JSON.stringify(data);
  }

  return (
    <React.Fragment>
      <HeadBar />
        <FormContainer>
          <Typography variant="h3" gutterBottom marked="center" align="center" sx={{ mb: 4 }}>
            Log In
          </Typography>

          <TextField 
            required
            id="email"
            name="email"
            label="E-mail"
            fullWidth
            margin="normal"
            {...register('email')}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
          />

          <TextField 
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />    

          <FormControlLabel control={<Checkbox defaultChecked/>} label="Remember me" />
          <Grid item xs={12} sm={12} align="center" justify="center">
            <Button onClick={handleSubmit(onSubmit)} variant={"contained"} size="large" sx={{mt: 5, width: 0.8}}>
              Log In
            </Button>
          </Grid> 

          <Typography variant="body2" align="center" sx={{mt: 2}}>
            {'Not a member yet? '}
            <NavText
              to="/register"
              align="center"
              underline="always"
              variant='inherit'
            >
              Register here
            </NavText>
          </Typography>
        </FormContainer>
      <Footer />
    </React.Fragment>
  )
}

export default Login;