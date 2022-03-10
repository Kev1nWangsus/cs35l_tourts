import { Button, Box, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../common/context/authcontext';
import { useHttpClient } from '../../common/hooks/http-hook';

const Profile = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const controller = new AbortController();
    const uid = localStorage.getItem('user');
    const url = `http://localhost:5000/api/users/${uid}`;

    const fetchData = async () => {
      const [err, response] = await sendRequest(url)
        .then((response) => [null, response])
        .catch((err) => [err, null]);

      if (err) {
        console.log('error', err);
      } else {
        console.log('data', response);
        setLoadedUsers(response.user);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [sendRequest]);

  const auth = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('user');
    console.log('Successfully erased cache!');
    auth.logout();
    console.log('Successfully logged out!');
  };

  return (
    <React.Fragment>
      <div
        style={{
          maxWidth: '1000px',
          margin: '0px auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            margin: '18px 0px',
            borderBottom: '9px solid grey',
          }}
        >
          <div>
            <img
              style={{ width: '200px', height: '200px', borderRadius: '100px' }}
              src='https://i0.wp.com/short-biography.com/wp-content/uploads/roger-federer/Roger-Federer.jpg?w=932&ssl=1' //Later replaced with user.image
            />
          </div>
          {!isLoading && loadedUsers && (
            <div
              style={{
                color: 'black',
                textAlign: 'left',
              }}
            >
              <Typography variant='h4' component='div'>
                {loadedUsers.username}
              </Typography>
              <div
                style={{
                  color: 'grey',
                  textAlign: 'justify',
                  justifyContent: 'space-between',
                  width: '108%', //Later replaced with user.info
                }}
              >
                <h4>Rating: {loadedUsers.rating}</h4>
                <h4>Region: {loadedUsers.region}</h4>
                <h4>Gender: {loadedUsers.gender}</h4>
                <h4>
                  'Serves'(appointments): {loadedUsers.appointments.length}
                </h4>
              </div>
            </div>
          )}
        </div>

        <div className='serves'>
          <img
            className='item'
            alt='this should be a court image' //Later replaced with ongoing appointments, 可以做点击flip展示info
            src='https://images.unsplash.com/photo-1499510318569-1a3d67dc3976?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80'
          />
          <img
            className='item'
            alt='this should be a court image'
            src='https://images.unsplash.com/photo-1620742820748-87c09249a72a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80'
          />
          <img
            className='item'
            alt='this should be a court image'
            src='https://images.unsplash.com/photo-1480180566821-a7d525cdfc5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
          />
          <img
            className='item'
            alt='this should be a court image'
            src='https://images.unsplash.com/photo-1551773188-0801da12ddae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
          />
          <img
            className='item'
            alt='this should be a court image'
            src='https://images.unsplash.com/photo-1603404395085-1c3d6764ca9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=812&q=80'
          />
          <img
            className='item'
            alt='this should be a court image'
            src='https://images.unsplash.com/photo-1510846699902-9211b99dac11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
          />
        </div>
      </div>

      <Box
        height='20vh'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography invariant='h2'>
          Profile page is still under construction...
        </Typography>
        <Button
          onClick={handleLogout}
          variant={'contained'}
          size='large'
          sx={{ mt: 5, width: 0.57 }}
        >
          Log out
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default Profile;
