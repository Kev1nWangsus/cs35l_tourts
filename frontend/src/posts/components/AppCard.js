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
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import EventIcon from '@mui/icons-material/Event';
import StadiumIcon from '@mui/icons-material/Stadium';
import React, { useState, useEffect } from 'react';
import FormContainer from '../../common/components/FormElement/FormContainer';
import { textAlign } from '@mui/system';

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
                    size = 'extrabig'
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize='inherit' />
                  </IconButton>
                }
                sx={{ mb: 0 }}
              ></Alert>
            </Collapse>
            <Typography
              variant='h2'
              gutterBottom
              marked='center'
              align='center'
              sx={{ mb: 4 }}
            >
              appointment details
            </Typography>
            <Typography
              color='#696969'
              variant='h4'
              component='div'
              align='center'
              justfiy='center'
              borderBottom='2px grey solid'
            >
              <div>
                <img
                  style={{
                    width: '160px',
                    height: '160px',
                    borderRadius: '80px',
                    align: 'center',
                  }}
                  src='https://marriedbiography.com/wp-content/uploads/2019/05/Rafael-Nadal.jpg' //Later replaced with user.image
                />
              </div>
              {title}
            </Typography>
            <Grid
              color='#696969'
              item
              xs={8}
              sm={15}
              align='center'
              justify='center'
            >
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <DocumentScannerIcon />
                    </ListItemIcon>
                    <h5> Description: {description}</h5>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AccessAlarmsIcon />
                    </ListItemIcon>
                    <h5>{`Start Time: ${start}`}</h5>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AccessAlarmsIcon />
                    </ListItemIcon>
                    <h5>{`End Time: ${end}`}</h5>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <EventIcon />
                    </ListItemIcon>
                    <h5>{`Appointment Date: ${formatDate}`}</h5>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <StadiumIcon />
                    </ListItemIcon>
                    <h5>{`Address: ${address}`}</h5>
                  </ListItemButton>
                </ListItem>
              </List>
              <CardMedia
                component='img'
                height='350'
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
