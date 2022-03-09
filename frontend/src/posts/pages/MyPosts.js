import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../../common/hooks/http-hook';
import AppCard from '../components/AppCard';
import { Grid, Container, Typography, Divider } from '@mui/material';
import FormContainer from '../../common/components/FormElement/FormContainer';

const MyPosts = () => {
  const [appointments, setAppointments] = useState([]);
  const [refetch, setRefetch] = useState(0);
  const { isLoading, error, sendRequest } = useHttpClient();

  useEffect(() => {
    console.log(refetch);
    const controller = new AbortController();
    const uid = localStorage.getItem('user');
    const url = `http://localhost:5000/api/appointments/user/${uid}`;

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
      controller.abort();
    };
  }, [refetch]);

  return (
    <React.Fragment>
      <Container sx={{ py: 4, maxWidth: 'lg', minHeight: '80vh' }}>
        <FormContainer maxWidth='lg' marginTop={2} marginBottom={2}>
          <Typography variant='h4' sx={{ mb: 1 }}>
            TODO:
          </Typography>
          <Divider />
          <Grid container spacing={4} sx={{ mt: 1 }}>
            {appointments.map((app, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <AppCard app={app} accept={false} />
              </Grid>
            ))}
          </Grid>
        </FormContainer>

        <FormContainer maxWidth='lg' marginTop={2} marginBottom={2}>
          <Typography variant='h4' sx={{ mb: 1 }}>
            FUTURE:
          </Typography>
          <Divider />
          <Grid container spacing={4} sx={{ mt: 1 }}>
            {appointments.map((app, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <AppCard app={app} accept={false} />
              </Grid>
            ))}
          </Grid>
        </FormContainer>

        <FormContainer maxWidth='lg' marginTop={2} marginBottom={2}>
          <Typography variant='h4' sx={{ mb: 1 }}>
            Finished:
          </Typography>
          <Divider />
          <Grid container spacing={4} sx={{ mt: 1 }}>
            {appointments.map((app, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <AppCard app={app} accept={false} />
              </Grid>
            ))}
          </Grid>
        </FormContainer>

        <FormContainer maxWidth='lg' marginTop={2} marginBottom={2}>
          <Typography variant='h4' sx={{ mb: 1 }}>
            Expired:
          </Typography>
          <Divider />
          <Grid container spacing={4} sx={{ mt: 1 }}>
            {appointments.map((app, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <AppCard app={app} accept={false} />
              </Grid>
            ))}
          </Grid>
        </FormContainer>
      </Container>
    </React.Fragment>
  );
};

export default MyPosts;
