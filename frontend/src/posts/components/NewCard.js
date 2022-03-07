import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import {
  Alert,
  Backdrop,
  Button,
  Card,
  CircularProgress,
  DialogContent,
  Grid,
  IconButton,
  Modal,
  Snackbar,
  Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import FormContainer from '../../common/components/FormElement/FormContainer';
import { useHttpClient } from '../../common/hooks/http-hook';

const defaultValues = {
  description: '',
  title: '',
  address: '',
  date: new Date(),
  startTime: new Date(),
  endTime: new Date(),
};

const NewCard = (props) => {
  const validator = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    address: Yup.string().required('Address is required'),
  });
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validator),
  });

  // handle logic of modal component
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCloseSuccess = () => setOpenSuccess(false);
  const handleCloseError = () => setOpenError(false);

  const { isLoading, error, sendRequest } = useHttpClient();

  const onSubmit = async (data) => {
    data.date = format(data.date, 'MM/dd/yyyy');
    data.timerange = {
      start: format(data.startTime, 'HH:mm'),
      end: format(data.endTime, 'HH:mm'),
    };
    data.creator = localStorage.getItem('user');
    delete data.startTime;
    delete data.endTime;
    console.log(data);
    const [err, response] = await sendRequest(
      'http://localhost:5000/api/appointments/create',
      'POST',
      JSON.stringify(data),
      { 'Content-Type': 'application/json' }
    )
      .then((response) => [null, response])
      .catch((err) => [err, null]);

    if (err) {
      console.log('error', err);
      setOpenError(true);
    } else {
      setOpenSuccess(true);
      console.log('data', response);
    }
    reset(defaultValues);
    handleClose();
  };

  return (
    <React.Fragment>
      <Card
        sx={{
          width: 1,
          height: 1,
          ':hover': {
            boxShadow: 10,
          },
        }}
        style={{
          borderStyle: 'dashed',
          borderColor: '#49b02a',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        elevation={0}
        onClick={handleOpen}
      >
        <IconButton color='secondary'>
          <AddIcon sx={{ fontSize: 100 }} />
        </IconButton>
      </Card>
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseError}
          variant='filled'
          severity='error'
          sx={{ width: '100%', mt: 6 }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSuccess}
          variant='filled'
          severity='success'
          sx={{ width: '100%', mt: 6 }}
        >
          {'Successfully submitted'}
        </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
        sx={{ mt: 8 }}
      >
        <DialogContent>
          <FormContainer maxWidth='md'>
            <Typography
              variant='h3'
              gutterBottom
              marked='center'
              align='center'
              sx={{ mb: 4 }}
            >
              Start a new appointment
            </Typography>

            <Backdrop
              sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
            >
              <CircularProgress color='inherit' />
            </Backdrop>

            <TextField
              required
              label='Title'
              placeholder='Enter your title'
              fullWidth
              {...register('title')}
              sx={{ mt: 4, mb: 4 }}
              error={errors.title ? true : false}
              helperText={errors.title?.message}
            />
            <TextField
              required
              label='Address'
              placeholder='Enter the address'
              fullWidth
              {...register('address')}
              sx={{ mb: 4 }}
              error={errors.address ? true : false}
              helperText={errors.address?.message}
            />
            <TextField
              required
              label='Description'
              placeholder='Enter your description'
              fullWidth
              multiline
              sx={{ mb: 4 }}
              {...register('description')}
              minRows={3}
              maxRows={5}
              error={errors.description ? true : false}
              helperText={errors.description?.message}
            />
            <Grid marked='center' align='center'>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3} direction='row'>
                  <Controller
                    name='date'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <DesktopDatePicker
                        label='Date'
                        inputFormat='MM/dd/yyyy'
                        value={value}
                        onChange={onChange}
                        minDate={new Date()}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    )}
                  />
                  <Controller
                    name='startTime'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TimePicker
                        label='Start'
                        ampm={false}
                        value={value}
                        onChange={onChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    )}
                  />
                  <Controller
                    name='endTime'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TimePicker
                        label='End'
                        ampm={false}
                        value={value}
                        onChange={onChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>

            <Grid container>
              <Grid item xs={6} sm={6} align='center' justify='center'>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  variant={'contained'}
                  size='large'
                  sx={{ mt: 5, width: 0.8 }}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={6} sm={6} align='center' justify='center'>
                <Button
                  variant={'contained'}
                  size='large'
                  sx={{ mt: 5, width: 0.8 }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </FormContainer>
        </DialogContent>
      </Modal>
    </React.Fragment>
  );
};

export default NewCard;
