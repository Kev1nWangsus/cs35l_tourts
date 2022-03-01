import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from './auth/pages/Login.js';
import Register from './auth/pages/Register.js';
import beautify from './common/beautify';
import Footer from './common/components/NavigationElement/Footer';
import HeadBar from './common/components/NavigationElement/HeadBar';
import HomeBackground from './common/components/ViewElement/HomeBackground';
import Users from './users/pages/Users.js';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HeadBar />
          <HomeBackground />
          <Footer />
        </Route>

        <Route path="/users" exact>
          <Users />
        </Route>

        <Route path="/login" exact>
          <Login />
        </Route>

        <Route path="/register" exact>
          <Register />
        </Route>

        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default beautify(App);
