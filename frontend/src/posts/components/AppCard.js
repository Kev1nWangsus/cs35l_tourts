import {
  Button,
  Card,
  Grid,
  Backdrop,
  CardContent,
  DialogContent,
  CircularProgress,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useHttpClient } from '../../common/hooks/http-hook';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from 'react';
import FormContainer from '../../common/components/FormElement/FormContainer';

const AppCard = (props) => {
  const { id, image, creator, title, description, date, start, end, address } =
    props.app;
  const usDate = date + 'T00:00:00.000-08:00';
  const formatDate = format(new Date(usDate), 'PPP');
  const { isLoading, sendRequest } = useHttpClient();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAccept = async () => {
    const url = `http://localhost:5000/api/appointments/${id}`;
    const acceptorId = localStorage.getItem('user');
    const data = { acceptorId: acceptorId };
    console.log(data);
    const [err, response] = await sendRequest(
      url,
      'PATCH',
      JSON.stringify(data),
      { 'Content-Type': 'application/json' }
    )
      .then((response) => [null, response])
      .catch((err) => [err, null]);

    if (err) {
      console.log('error', err);
    } else {
      props.delApp(1);
      console.log('Successfully accepted', response);
    }
  };

  const handleDelete = async () => {
    const url = `http://localhost:5000/api/appointments/${id}`;
    const [err, response] = await sendRequest(url, 'DELETE')
      .then((response) => [null, response])
      .catch((err) => [err, null]);

    if (err) {
      console.log('error', err);
    } else {
      props.delApp(1);
      console.log('Successfully deleted', response);
    }
  };

  return (
    <Card sx={{ width: 1, height: 1 }}>
      <Backdrop
        sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <CardMedia
        component='img'
        height='100'
        image={`http://localhost:5000/${image}`}
        alt='view'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        <Typography
          color='text.secondary'
          noWrap
          sx={{
            width: 1,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {description}
        </Typography>
        <Typography color='text.secondary'>
          {`${start}-${end}, ${formatDate}`}
        </Typography>
        <Typography color='text.secondary'>{`@${address}`}</Typography>
      </CardContent>
      <Stack direction='row' justifyContent='end'>
        {props.accept && (
          <Button
            variant='contained'
            color='secondary'
            sx={{ m: 1, width: 0.2 }}
            onClick={handleAccept}
          >
            Accept
          </Button>
        )}
        {props.del && (
          <Button
            variant='contained'
            color='error'
            onClick={handleDelete}
            sx={{ m: 1, width: 0.2 }}
          >
            Delete
          </Button>
        )}
        <Button
          variant='outlined'
          color='primary'
          onClick={handleOpen}
          sx={{ m: 1, width: 0.2 }}
        >
          More
        </Button>
      </Stack>
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
            <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label='close'
                    color='inherit'
                    size='big'
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize='inherit' />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              ></Alert>
            </Collapse>
            <Typography
              variant='h3'
              gutterBottom
              marked='center'
              align='center'
              sx={{ mb: 4 }}
            >
              appointment details
            </Typography>
            <Typography align='center' variant='h4' component='div'>
              {title}
            </Typography>
            <Grid item xs={8} sm={15} align='center' justify='center'>
              <h4> Description: {description}</h4>
              <h4>{`Start Time: ${start}`}</h4>
              <h4>{`End Time: ${end}`}</h4>
              <h4>{`Appointment Date: ${formatDate}`}</h4>
              <h4>{`Address: ${address}`}</h4>
              <CardMedia
                component='img'
                height='500'
                image={`http://localhost:5000/${image}`}
                alt='view'
              />
            </Grid>
            <Grid item xs={8} sm={15} align='center' justify='center'>
              <Button
                variant={'contained'}
                size='large'
                color='secondary'
                sx={{ mt: 5, width: 0.8 }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Grid>
          </FormContainer>
        </DialogContent>
      </Modal>
    </Card>
  );
};

export default AppCard;
