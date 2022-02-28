import React from 'react';
import './App.css';
import beautify from './common/beautify';
import Footer from './common/components/NavigationElement/Footer';
import HeadBar from './common/components/NavigationElement/HeadBar';
import HomeBackground from './common/components/ViewElement/HomeBackground';

const App = () => {
  return (
    <React.Fragment>
      <HeadBar />
      <HomeBackground />
      <Footer />
    </React.Fragment>
  )
}

export default beautify(App);
