import { yupResolver } from '@hookform/resolvers/yup';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import { Grid, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

const defaultValues = {
  date: null,
  startTime: null,
  endTime: null,
};

const validator = Yup.object().shape({
  date: Yup.date().nullable().typeError('Invalid date'),
  startTime: Yup.date().nullable().typeError('Invalid time'),
  endTime: Yup.date()
    .nullable()
    .typeError('Invalid time')
    .min(Yup.ref('startTime'), 'End time cannot come before start time'),
});

const Search = (props) => {
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

  const onSubmit = (data) => {
    var date, startTime, endTime = null;

    if (data.date === null) {
      date = null;
    }
    else {
      date = format(data.date, 'MM/dd/yyyy');
    }
    if (data.startTime === null) {
      startTime = "00:00";
    }
    else {
      startTime = format(data.startTime, 'HH:mm');
    }
    if (data.endTime === null) {
      endTime = "23:59";
    }
    else {
      endTime = format(data.endTime, 'HH:mm');
    }
    props.onChange([date, startTime, endTime]);

  };


  const onReset = () => {
    reset(defaultValues);
  };
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={8} marked='center' align='center'>
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

          <Stack
            spacing={2}
            direction='row'
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Button
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
              sx={{ width: 0.4, height: 1 }}
            >
              Search
            </Button>
            <Button
              onClick={onReset}
              variant={'contained'}
              sx={{ width: 0.4, height: 1 }}
            >
              Reset
            </Button>
          </Stack>
      </Grid>
    </React.Fragment>
  );
};

export default Search;
