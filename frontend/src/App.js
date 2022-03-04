import React, { useCallback, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import Login from './auth/pages/Login.js';
import Register from './auth/pages/Register.js';
import beautify from './common/beautify';
import Footer from './common/components/NavigationElement/Footer';
import HeadBar from './common/components/NavigationElement/HeadBar';
import HomeBackground from './common/components/ViewElement/HomeBackground';
import { AuthContext } from './common/context/authcontext';
import Posts from './posts/pages/Posts.js';
import Users from './users/pages/Users.js';

const App = () => {
  // set up global authentication context
  const [isLogIn, setIsLogIn] = useState(true);
  const [uid, setUId] = useState(false);

  const login = useCallback((uid) => {
    setIsLogIn(true);
    setUId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLogIn(false);
    setUId(null);
  }, []);

  let routes = isLogIn ? (
    <Switch>
      <Route path='/' exact>
        <Posts />
      </Route>

      <Route path='/users' exact>
        <Users />
      </Route>

      <Route path='/:uid/apps' exact>
        {/* view all appointments initiated by user */}
      </Route>
      <Route path='/app/new' exact>
        {/* initiate a new appointment */}
      </Route>
      <Route path='/app/:appId'>{/* view an appointment */}</Route>
      <Redirect to='/' />
    </Switch>
  ) : (
    <Switch>
      <Route path='/' exact>
        <HomeBackground />
      </Route>

      <Route path='/login' exact>
        <Login />
      </Route>

      <Route path='/register' exact>
        <Register />
      </Route>

      <Redirect to='/' />
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={{
        isLogIn: isLogIn,
        uid: uid,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <HeadBar />
        {routes}
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
};

export default beautify(App);
