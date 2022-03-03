import React from 'react';
import AppCard from '../components/AppCard';
import { Container, Grid } from '@mui/material';

const Post = () => {
  const cards = [
    { title: 'Hi', description: 'hello world', date: Date(), time: Date() },
    { title: 'Hi', description: 'hello world', date: Date(), time: Date() },
    { title: 'Hi', description: 'hello world', date: Date(), time: Date() },
    { title: 'Hi', description: 'hello world', date: Date(), time: Date() },
    { title: 'Hi', description: 'hello world', date: Date(), time: Date() },
    { title: 'Hi', description: 'hello world', date: Date(), time: Date() },
    { title: 'Hi', description: 'hello world', date: Date(), time: Date() },
  ];
  return (
    <React.Fragment>
      <Container sx={{ py: 8 }} maxWidth='lg'>
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
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
