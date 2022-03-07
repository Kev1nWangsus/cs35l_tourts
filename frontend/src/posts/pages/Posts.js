import { Backdrop, CircularProgress, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../common/hooks/http-hook';
import AppCard from '../components/AppCard';
import NewCard from '../components/NewCard';

const Post = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [appointments, setAppointments] = useState([]);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const url = 'http://localhost:5000/api/appointments';

    const fetchData = async () => {
      const [err, response] = await sendRequest(url)
        .then((response) => [null, response])
        .catch((err) => [err, null]);

      if (err) {
        console.log('error', err);
      } else {
        console.log('data', response);
        setAppointments(response.appointments);
      }
    };

    fetchData();

    return () => {
      // cancel the subscription
      controller.abort();
    };
  }, [refetch]);

  return (
    <React.Fragment>
      <Container sx={{ py: 8, maxWidth: 'lg', minHeight: '80vh' }}>
        <Backdrop
          sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
        {!isLoading && (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <NewCard submitNewApp={(refetch) => setRefetch(refetch)} />
            </Grid>
            {appointments.map((app, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <AppCard
                  title={app.title}
                  description={app.description}
                  date={app.date}
                  start={app.timerange.start}
                  end={app.timerange.end}
                  image={app.image}
                  accept={app.creator != localStorage.getItem('user')}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </React.Fragment>
  );
};

export default Post;
