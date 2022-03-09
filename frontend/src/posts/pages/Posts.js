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
import Search from '../components/Search';

const Post = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [appointments, setAppointments] = useState([]);
  const [add, setAdd] = useState(0);
  const [del, setDel] = useState(0);
  const [addSuccess, setAddSuccess] = useState(false);
  const [delSuccess, setDelSuccess] = useState(false);

  const [time, setTime] = useState([]);


  const handleCloseAddSuccess = () => setAddSuccess(false);
  const handleCloseDelSuccess = () => setDelSuccess(false);
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
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const url = 'http://localhost:5000/api/appointments';

    const fetchData = async () => {
      const [err, response] = await sendRequest(url)
        .then((response) => [null, response])
        .catch((err) => [err, null]);

      if (err) {
        console.log('error', err);
      } else {
        console.log('data', response);
        if (add >= 1) setAddSuccess(true);
        setAppointments(response.appointments);
      }
    };

    fetchData();
  }, [add]);

  useEffect(() => {
    const url = 'http://localhost:5000/api/appointments';

    const fetchData = async () => {
      const [err, response] = await sendRequest(url)
        .then((response) => [null, response])
        .catch((err) => [err, null]);

      if (err) {
        console.log('error', err);
      } else {
        console.log('data', response);
        if (del >= 1) setDelSuccess(true);
        setAppointments(response.appointments);
      }
    };

    fetchData();
  }, [del]);

  function handleChange(newTime) {
    setTime(newTime);
    console.log(newTime);
  }

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
          open={addSuccess}
          autoHideDuration={3000}
          onClose={handleCloseAddSuccess}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseAddSuccess}
            variant='filled'
            severity='success'
            sx={{ width: '100%', mt: 6 }}
          >
            {'Successfully submitted new appointment'}
          </Alert>
        </Snackbar>
        <Snackbar
          open={delSuccess}
          autoHideDuration={3000}
          onClose={handleCloseDelSuccess}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseDelSuccess}
            variant='filled'
            severity='success'
            sx={{ width: '100%', mt: 6 }}
          >
            {'Successful'}
          </Alert>
        </Snackbar>

        <Search value={time} onChange={handleChange}/>

        {!isLoading && (
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <NewCard addApp={(a) => setAdd(add + a)} />
            </Grid>
            {appointments.map((app, index) => {
              if (app.acceptor == null) {
                return (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <AppCard app={app} delApp={(a) => setDel(del + a)} />
                  </Grid>
                );
              }
            })}
          </Grid>
        )}
      </Container>
    </React.Fragment>
  );
};

export default Post;
