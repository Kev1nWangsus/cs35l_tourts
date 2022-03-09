import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../../common/hooks/http-hook';
import AppCard from '../components/AppCard';
import { Grid, Container } from '@mui/material';
import FormBackground from '../../common/components/FormElement/FormBackground';
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
      <Container sx={{ py: 8, maxWidth: 'lg', minHeight: '80vh' }}>
        <FormContainer maxWidth='lg'>
          {'Ongoing:'}
          <Grid container spacing={4}>
            {appointments.map((app, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <AppCard app={app} accept={false} />
              </Grid>
            ))}
          </Grid>
        </FormContainer>

        {'Accepted:'}
        <Grid container spacing={4}>
          {appointments.map((app, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <AppCard app={app} accept={false} />
            </Grid>
          ))}
        </Grid>
        {/* 
        {'Finished'}
        <Grid container spacing={4}>
          {appointments.map((app, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <AppCard
                title={app.title}
                description={app.description}
                date={app.date}
                start={app.start}
                end={app.end}
                image={app.image}
                accept={false}
              />
            </Grid>
          ))}
        </Grid>

        {'Expired:'}
        <Grid container spacing={4}>
          {appointments.map((app, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <AppCard
                title={app.title}
                description={app.description}
                date={app.date}
                start={app.start}
                end={app.end}
                image={app.image}
                accept={false}
              />
            </Grid>
          ))}
        </Grid> */}
      </Container>
    </React.Fragment>
  );
};

export default MyPosts;
