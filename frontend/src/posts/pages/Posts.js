import {
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../common/hooks/http-hook';
import AppCard from '../components/AppCard';
import NewCard from '../components/NewCard';

const Post = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [appointments, setAppointments] = useState([]);
  const [refetch, setRefetch] = useState(0);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleCloseSuccess = () => setOpenSuccess(false);

  useEffect(() => {
    console.log(refetch);
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
        if (refetch >= 1) setOpenSuccess(true);
        setAppointments(response.appointments);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [refetch, sendRequest]);

  return (
    <React.Fragment>
      <Container sx={{ py: 8, maxWidth: 'lg', minHeight: '80vh' }}>
        <Backdrop
          sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
        <Snackbar
          open={openSuccess}
          autoHideDuration={3000}
          onClose={handleCloseSuccess}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSuccess}
            variant='filled'
            severity='success'
            sx={{ width: '100%', mt: 6 }}
          >
            {'Successfully submitted'}
          </Alert>
        </Snackbar>
        {!isLoading && (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <NewCard submitNewApp={(a) => setRefetch(refetch + a)} />
            </Grid>
            {appointments.map((app, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <AppCard
                  title={app.title}
                  description={app.description}
                  date={app.date}
                  start={app.start}
                  end={app.end}
                  image={app.image}
                  accept={app.creator !== localStorage.getItem('user')}
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
