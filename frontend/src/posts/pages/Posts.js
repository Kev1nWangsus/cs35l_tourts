import {
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { useHttpClient } from '../../common/hooks/http-hook';
import AppCard from '../components/AppCard';
import NewCard from '../components/NewCard';
import Search from '../components/Search';
import { sorting } from '../../common/functions/compare';

const Post = () => {
  const user = localStorage.getItem('user');
  const { isLoading, error, sendRequest } = useHttpClient();
  const [appointments, setAppointments] = useState([]);
  const [add, setAdd] = useState(0);
  const [del, setDel] = useState(0);
  const [addSuccess, setAddSuccess] = useState(false);
  const [delSuccess, setDelSuccess] = useState(false);

  const [searchInfo, setSearchInfo] = useState([]);

  const handleCloseAddSuccess = () => setAddSuccess(false);
  const handleCloseDelSuccess = () => setDelSuccess(false);

  const isFirstRun = useRef(true);

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
        if (add >= 1) setAddSuccess(true);
        setAppointments(response.appointments);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [add]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
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

  function handleChange(newInfo) {
    setSearchInfo(newInfo);
  }

  function appsToDisplay(apps) {
    if (searchInfo.length === 0) return apps;
    var result = [];

    if (searchInfo[0] === null) {
      result = apps;
    } else {
      var appsCopy = apps.map((x) => x);
      for (let i = 0; i < appsCopy.length; i++) {
        if (appsCopy[i].date === searchInfo[0]) {
          result.push(appsCopy[i]);
        }
      }
    }

    let user_rating = localStorage.getItem('rating');
    let user_region = localStorage.getItem('region');

    result = sorting(
      user_rating,
      user_region,
      searchInfo[1],
      searchInfo[2],
      result,
      searchInfo[3]
    );

    return result;
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

        <Search value={searchInfo} onChange={handleChange} />

        {!isLoading && (
          <Grid container spacing={4} sx={{ mt: 4, minHeight: '30vh' }}>
            <Grid item xs={12} sm={6} md={4}>
              <NewCard addApp={(a) => setAdd(add + a)} />
            </Grid>
            {appsToDisplay(appointments).map((app, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <AppCard
                  app={app}
                  desc={true}
                  del={user === app.creator}
                  accept={user !== app.creator}
                  delApp={(a) => setDel(del + a)}
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
