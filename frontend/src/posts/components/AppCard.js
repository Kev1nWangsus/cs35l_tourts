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
import IconButton from '@mui/material/IconButton';
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
import MapIcon from '@mui/icons-material/Map';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const AppCard = (props) => {
  const {
    id,
    image,
    creator,
    title,
    description,
    date,
    start,
    end,
    address,
    rating,
    region,
  } = props.app;
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
    <Card
      sx={{ width: 1, height: 1 }}
      style={{ flex: 1, backgroundColor: '#F0F0F0' }}
    >
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
        <Typography align='center' gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        <Stack
          direction='row'
          alignItems='center'
          gap={1}
          sx={{ ml: 2, mt: 1 }}
        >
          <EventIcon color='text.secondary' />
          <Typography color='text.secondary'>{` ${formatDate}`}</Typography>
        </Stack>

        <Stack
          direction='row'
          alignItems='center'
          gap={1}
          sx={{ ml: 2, mt: 1 }}
        >
          <AccessAlarmsIcon color='text.secondary' />
          <Typography color='text.secondary'>{`${start}-${end} `}</Typography>
        </Stack>

        {rating && (
          <Stack
            direction='row'
            alignItems='center'
            gap={1}
            sx={{ ml: 2, mt: 1 }}
          >
            <StarIcon color='primary.light' />
            <Typography color='text.secondary'>{`   ${rating}`}</Typography>
          </Stack>
        )}

        <Stack
          direction='row'
          alignItems='center'
          gap={1}
          sx={{ ml: 2, mt: 1 }}
        >
          <LocationOnIcon color='primary.light' />
          <Typography color='text.secondary'>{`   ${address}`}</Typography>
        </Stack>

        {region && (
          <Stack
            direction='row'
            alignItems='center'
            gap={1}
            sx={{ ml: 2, mt: 1 }}
          >
            <MapIcon color='primary.light' />
            <Typography color='text.secondary'>{`   ${region}`}</Typography>
          </Stack>
        )}

        {props.desc && (
          <Stack
            direction='row'
            alignItems='center'
            gap={0}
            sx={{ ml: 2, mt: 1 }}
          >
            <DocumentScannerIcon color='text.secondary' />
            <Typography
              color='text.secondary'
              noWrap
              sx={{
                ml: 1,
                width: 1,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {`${description}`}
            </Typography>
          </Stack>
        )}
      </CardContent>
      <Stack direction='row' justifyContent='end'>
        {props.accept && (
          <Button
            variant='contained'
            color='secondary'
            sx={{ mx: 1, mb: 1, width: 0.2 }}
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
            sx={{ mx: 1, mb: 1, width: 0.2 }}
          >
            Cancel
          </Button>
        )}
        {!props.noMore && (
          <Button
            variant='outlined'
            color='primary'
            onClick={handleOpen}
            sx={{ mx: 1, mb: 1, width: 0.2 }}
          >
            More
          </Button>
        )}
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
            <IconButton
              color='inherit'
              size='big'
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
            <Typography
              variant='h3'
              gutterBottom
              marked='center'
              align='center'
              sx={{ mb: 4 }}
            >
              appointment details:
            </Typography>
            <div
              style={{
                justifyContent: 'space-around',
                display: 'flex',
              }}
            >
              <img
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '80px',
                  align: 'center',
                  margin: '20px 0px',
                }}
                src='https://marriedbiography.com/wp-content/uploads/2019/05/Rafael-Nadal.jpg' //Later replaced with user.image
              />
              <div
                style={{
                  color: '#424242',
                  textAlign: 'left',
                }}
              >
                <h2
                  style={{
                    borderBottom: '2px solid grey',
                  }}
                >
                  Creator: {props.app.username}
                </h2>
                <div
                  style={{
                    color: 'gray',
                    textAlign: 'justify',
                    justifyContent: 'space-between',
                    width: '108%', //Later replaced with user.info
                  }}
                >
                  <h4>Rating: {props.app.rating}</h4>
                  <h4>Region: {props.app.region}</h4>
                  <h4>Gender: {props.app.gender}</h4>
                </div>
              </div>
            </div>
            <Typography
              color='#424242'
              variant='h4'
              fontSize='12'
              component='div'
              align='center'
              justfiy='center'
              borderBottom='2px grey solid'
            >
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
                      <EventIcon />
                    </ListItemIcon>
                    <h4>{`Appointment Date: ${formatDate}`}</h4>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AccessAlarmsIcon />
                    </ListItemIcon>
                    <h4>{`Start Time: ${start}`}</h4>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AccessAlarmsIcon />
                    </ListItemIcon>
                    <h4>{`End Time: ${end}`}</h4>
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <StadiumIcon />
                    </ListItemIcon>
                    <h4>{`Address: ${address}`}</h4>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <DocumentScannerIcon />
                    </ListItemIcon>
                    <h4> Description: {description}</h4>
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
                color='error'
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
