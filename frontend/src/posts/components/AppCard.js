import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { useHttpClient } from '../../common/hooks/http-hook';

const AppCard = (props) => {
  const { id, image, creator, title, description, date, start, end, address } =
    props.app;
  const accept = creator != localStorage.getItem('user');
  const usdate = date + 'T00:00:00-08:00';
  const formatDate = format(new Date(usdate), 'PPP');
  const { isLoading, error, sendRequest } = useHttpClient();

  const handleAccept = async () => {
    const url = `http://localhost:5000/api/appointments/${id}`;
    const acceptor = localStorage.getItem('user');
    const data = { acceptorId: acceptor };
    console.log(localStorage.getItem('user'));
    console.log(JSON.stringify(data));
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
        {accept ? (
          <Button
            variant='contained'
            color='secondary'
            sx={{ m: 1, width: 0.2 }}
            onClick={handleAccept}
          >
            Accept
          </Button>
        ) : (
          <Button
            variant='contained'
            color='error'
            onClick={handleDelete}
            sx={{ m: 1, width: 0.2 }}
          >
            Delete
          </Button>
        )}
        <Button variant='outlined' color='primary' sx={{ m: 1, width: 0.2 }}>
          More
        </Button>
      </Stack>
    </Card>
  );
};

export default AppCard;
