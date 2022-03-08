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
  Box,
  IconButton,
  Modal,
  Snackbar,
  Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormContainer from '../../common/components/FormElement/FormContainer';
import { useHttpClient } from '../../common/hooks/http-hook';

const defaultValues = {
  description: '',
  title: '',
  address: '',
  date: new Date(),
  startTime: new Date(),
  endTime: new Date(),
  file: null,
};

const NewCard = (props) => {
  const validator = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    address: Yup.string().required('Address is required'),
    date: Yup.date().typeError('Invalid date').required('Date is required'),
    startTime: Yup.date()
      .typeError('Invalid time')
      .required('Start time is required'),
    endTime: Yup.date()
      .typeError('Invalid time')
      .required('End time is required')
      .min(Yup.ref('startTime'), 'End time cannot come before start time'),
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCloseError = () => setOpenError(false);

  const { isLoading, error, sendRequest } = useHttpClient();

  const onSubmit = async (data) => {
    setImageUrl(null);
    const controller = new AbortController();
    const date = format(data.date, 'MM/dd/yyyy');
    const creator = localStorage.getItem('user');

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('address', data.address);
    formData.append('date', date);
    formData.append('start', format(data.startTime, 'HH:mm'));
    formData.append('end', format(data.endTime, 'HH:mm'));
    formData.append('image', data.file);
    formData.append('creator', creator);

    const [err, response] = await sendRequest(
      'http://localhost:5000/api/appointments/create',
      'POST',
      formData
    )
      .then((response) => [null, response])
      .catch((err) => [err, null]);

    if (err) {
      console.log('error', err);
      setOpenError(true);
    } else {
      props.submitNewApp(1);
      console.log('data', response);
    }
    handleClose();
  };

  // image preview
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

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
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={errors.date ? true : false}
                            helperText={errors.date?.message}
                          />
                        )}
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
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={errors.startTime ? true : false}
                            helperText={errors.startTime?.message}
                          />
                        )}
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
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={errors.endTime ? true : false}
                            helperText={errors.endTime?.message}
                          />
                        )}
                      />
                    )}
                    defaultValue={defaultValues.endTime}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>

            <Controller
              name='file'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <label htmlFor='actual-upload'>
                  <input
                    type='file'
                    id='actual-upload'
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      field.onChange(e.target.files[0]);
                      setSelectedImage(e.target.files[0]);
                    }}
                  />
                  <Button
                    color='primary'
                    variant='contained'
                    component='span'
                    sx={{ mt: 4 }}
                  >
                    {imageUrl ? 'Edit Image' : 'Upload Image'}
                  </Button>
                </label>
              )}
            />
            {imageUrl && selectedImage && (
              <Box mt={2}>
                <div>Preview:</div>
                <img src={imageUrl} alt={selectedImage.name} height='100px' />
              </Box>
            )}

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
