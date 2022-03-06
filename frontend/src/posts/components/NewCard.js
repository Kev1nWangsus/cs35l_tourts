import AddIcon from '@mui/icons-material/Add';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import {
  Button,
  Card,
  DialogContent,
  Grid,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import FormContainer from '../../common/components/FormElement/FormContainer';
import { format } from 'date-fns';
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
  // handle logic of modal component
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { isLoading, error, sendRequest } = useHttpClient();
  const { handleSubmit, register, control } = useForm({ defaultValues });
  const [data, setData] = useState(null);

  const [value, setValue] = useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

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
    } else {
      console.log('data', response);
    }
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
          <FormContainer>
            <Typography
              variant='h3'
              gutterBottom
              marked='center'
              align='center'
              sx={{ mb: 4 }}
            >
              Start a new appointment
            </Typography>

            <TextField
              label='Title'
              placeholder='Enter your title'
              fullWidth
              {...register('title')}
              sx={{ mt: 4, mb: 4 }}
            />
            <TextField
              label='Address'
              placeholder='Enter the address'
              fullWidth
              {...register('address')}
              sx={{ mb: 4 }}
            />
            <TextField
              label='Description'
              placeholder='Enter your description'
              fullWidth
              multiline
              sx={{ mb: 4 }}
              {...register('description')}
              minRows={3}
              maxRows={5}
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
                  {/* <TimePicker
                    label='Start Time'
                    ampm={false}
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />

                  <TimePicker
                    label='End Time'
                    ampm={false}
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  /> */}
                </Stack>
              </LocalizationProvider>
            </Grid>

            {/* <TextField
                required
                id='email'
                name='email'
                label='E-mail'
                fullWidth
                margin='normal'
                {...register('email')}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
              />  */}

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
