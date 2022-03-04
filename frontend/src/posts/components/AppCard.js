import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

const AppCard = (props) => {
  const { title, description, date, time } = props;
  return (
    <Card sx={{ width: 1, height: 1 }}>
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
