import { yupResolver } from '@hookform/resolvers/yup';
import {
  Autocomplete,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormContainer from '../../common/components/FormElement/FormContainer';
import NavText from '../../common/components/NavigationElement/NavText';
import { genders, ratings, regions } from '../../common/constant/constant';
import { AuthContext } from '../../common/context/authcontext';
import { useHttpClient } from '../../common/hooks/http-hook';
import Quiz from '../components/Quiz';

const defaultValues = {
  email: '',
  password: '',
  username: '',
  region: '',
  rating: '',
  gender: '',
  agree: false,
};

const Register = () => {
  const validator = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be at least 6 characters')
      .max(30, 'Password should be at most 30 characters'),
    rePassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    gender: Yup.string().required('Gender is required'),
    rating: Yup.string().required('Rating is required'),
    region: Yup.string().nullable().required('Region is required'),
    agree: Yup.boolean().oneOf([true], 'Please check the box for agreement'),
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validator),
  });

  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttpClient();

  let toHome = null;
  const onSubmit = async (data) => {
    // modify data
    delete data.rePassword;
    delete data.agree;
    data.rating = +data.rating;

    console.log(data);
    const [err, response] = await sendRequest(
      'http://localhost:5000/api/users/signup',
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
      localStorage.setItem('user', response.user.id);
      localStorage.setItem('rating', response.user.rating);
      localStorage.setItem('region', response.user.region);
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
          Register
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
          id='username'
          name='username'
          label='Username'
          fullWidth
          margin='dense'
          {...register('username')}
          error={errors.username ? true : false}
          helperText={errors.username?.message}
        />
        <TextField
          required
          id='email'
          name='email'
          label='E-mail'
          fullWidth
          margin='dense'
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
          margin='dense'
          {...register('password')}
          error={errors.password ? true : false}
          helperText={errors.password?.message}
        />
        <TextField
          required
          id='rePassword'
          name='rePassword'
          label='Confirm Password'
          type='password'
          fullWidth
          margin='dense'
          {...register('rePassword')}
          error={errors.rePassword ? true : false}
          helperText={errors.rePassword?.message}
        />
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Controller
              name='gender'
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl
                  required
                  fullWidth
                  margin='dense'
                  error={errors.gender ? true : false}
                >
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={value}
                    onChange={onChange}
                    id='gender'
                    name='gender'
                    label='Gender'
                    labelId='gender-id'
                  >
                    {genders.map((gender, index) => (
                      <MenuItem value={gender} key={index}>
                        {gender}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.gender && (
                    <FormHelperText>{errors.gender?.message}</FormHelperText>
                  )}
                </FormControl>
              )}
              defaultValue=''
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name='rating'
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl
                  required
                  fullWidth
                  margin='dense'
                  error={errors.rating ? true : false}
                >
                  <InputLabel>Rating</InputLabel>
                  <Select
                    value={value}
                    onChange={onChange}
                    id='rating'
                    name='rating'
                    label='rating'
                  >
                    {ratings.map((rating, index) => (
                      <MenuItem value={index + 1} key={index}>
                        {rating}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.rating && (
                    <FormHelperText>{errors.rating?.message}</FormHelperText>
                  )}
                </FormControl>
              )}
              defaultValue=''
            />
          </Grid>
          <Grid item xs={1} alignItems='center' justifyContent='center'>
            <Quiz />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name='region'
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl
                fullWidth
                margin='dense'
                error={errors.region ? true : false}
              >
                <Autocomplete
                  disablePortal
                  id='region'
                  options={regions}
                  onChange={(e, data) => onChange(data)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label='Region'
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                      }}
                      error={errors.region ? true : false}
                    />
                  )}
                />
                {errors.region && (
                  <FormHelperText>{errors.region?.message}</FormHelperText>
                )}
              </FormControl>
            )}
            onChange={([, data]) => data}
            defaultValue=''
          />
        </Grid>

        <FormControlLabel
          {...register('agree')}
          control={<Checkbox id='agree' name='agree' required />}
          id='agree'
          name='agree'
          label='Agree to terms and policy'
        />
        <FormHelperText error>
          {errors.agree ? errors.agree.message : ''}
        </FormHelperText>

        <Grid item xs={12} sm={12} align='center' justify='center'>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant={'contained'}
            size='large'
            sx={{ mt: 5, width: 0.8 }}
          >
            Sign up
          </Button>
        </Grid>
        <Typography variant='body2' align='center' sx={{ mt: 2 }}>
          {'Already have an account? '}
          <NavText
            to='/login'
            align='center'
            underline='always'
            variant='inherit'
          >
            Log in
          </NavText>
        </Typography>
      </FormContainer>
      {toHome}
    </React.Fragment>
  );
};

export default Register;
