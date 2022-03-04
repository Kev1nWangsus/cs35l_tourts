import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
  import AddIcon from '@mui/icons-material/Add';
  import {
    Button,
    Card,
    DialogContent,
    Grid,
    IconButton,
    Modal,
    Typography,
  } from '@mui/material';
  import React from 'react';
  import FormContainer from '../../common/components/FormElement/FormContainer';
  
  const NewCard = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState(new Date());

    const handleChange = (newValue) => {
      setValue(newValue);
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

              <Grid marked='center' align='center'>
                <Button>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Start Date"
                      inputFormat="MM/dd/yyyy"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                      label="Start Time"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />

                    <TimePicker
                      label="End Time"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
                </Button>
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