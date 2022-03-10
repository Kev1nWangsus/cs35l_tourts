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
  Box
} from '@mui/material';
import { format } from 'date-fns';
import { useHttpClient } from '../../common/hooks/http-hook';
import Modal from '@mui/material/Modal';
import React, { useState, useEffect } from 'react';
import FormContainer from '../../common/components/FormElement/FormContainer';

const AppCard = (props) => {
  const { id, image, creator, title, description, date, start, end, address } =
    props.app;
  const formatDate = format(new Date(date), 'PPP');
  const { isLoading, sendRequest } = useHttpClient();

  const [open, setOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
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
            <Typography
              display = "flex"
              justifyContent = "space-around"
              variant='h3'
              color = "Black"
             
              sx={{ mb: 4 }}
            >
              appointment details
            </Typography>
          
          
            {!isLoading && appointments && (
              <div item 
                    xs={8} 
                    sm={15} 
                    justifyContent = "space-around"
                    
              > 
                
                <h4 style = {{
                  color:"#696969",
                  textAlign:"center"
                }}> Description: {description}</h4>
                <h4 style = {{
                  color:"	#696969",
                  textAlign:"center"
                }}>{`Start Time: ${start}`}</h4>
                <h4 style = {{
                  color:"	#696969",
                  textAlign:"center"
                }}>{`End Time: ${end}`}</h4>
                <h4 style = {{
                  color:"	#696969",
                  textAlign:"center"
                }}>{`Appointment Date: ${formatDate}`}</h4>
                <h4 style = {{
                  color:"	#696969",
                  textAlign:"center"
                }}>{`Address: ${address}`}</h4>
                <CardMedia
                  component='img'
                  height='300'
                  image={`http://localhost:5000/${image}`}
                  alt='view'
                />
              </div>
            )}
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
