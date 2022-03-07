import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { format } from 'date-fns';

const AppCard = (props) => {
  const { image, title, description, date, start, end, accept } = props;
  const formatDate = format(new Date(date), 'PPP');

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
      </CardContent>
      <Stack direction='row' justifyContent='end'>
        {accept && (
          <Button
            variant='contained'
            color='secondary'
            sx={{ m: 1, width: 0.2 }}
          >
            Accept
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
