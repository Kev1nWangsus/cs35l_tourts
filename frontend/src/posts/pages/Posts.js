import React, { useState } from 'react';
import AppCard from '../components/AppCard';
import { Container, Grid } from '@mui/material';
import NewCard from '../components/NewCard';
import { useHttpClient } from '../../common/hooks/http-hook';

const Post = () => {
  const dummy_cards = [
    { title: 'Hello', description: 'test', date: Date(), time: Date() },
    {
      title: 'Hi',
      description:
        'test a really long long long long long long long long long long long long text',
      date: Date(),
      time: Date(),
    },
    {
      title: 'Hi',
      description: 'test normal text',
      date: Date(),
      time: Date(),
    },
    { title: 'Hi', description: 'hello world', date: Date(), time: Date() },
    {
      title: 'Hi',
      description:
        'Welcome to Los Angeles. I found a great court near San Gabriel.',
      date: Date(),
      time: Date(),
    },
    { title: 'Hi', description: 'hello world', date: Date(), time: Date() },
    { title: 'Hi', description: 'hello world', date: Date(), time: Date() },
    { title: 'Hi', description: 'hello world', date: Date(), time: Date() },
  ];

  const [appointments, setAppointments] = useState();

  const { isLoading, error, sendRequest } = useHttpClient();

  return (
    <React.Fragment>
      <Container sx={{ py: 8 }} maxWidth='lg'>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <NewCard />
          </Grid>
          {dummy_cards.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <AppCard
                title={card.title}
                description={card.description}
                date={card.date}
                time={card.time}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Post;
