import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
} from '@mui/material';

const AppCard = (props) => {
  const { title, description, date, time } = props;
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        component='img'
        height='100'
        image='https://source.unsplash.com/random'
        alt='view'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
      <Stack direction='row' justifyContent='end'>
        <Button variant='contained' color='secondary' sx={{ m: 1, width: 0.2 }}>
          Accept
        </Button>
        <Button variant='outlined' color='primary' sx={{ m: 1, width: 0.2 }}>
          More
        </Button>
      </Stack>
    </Card>
  );
};

export default AppCard;
