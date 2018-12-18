import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import IndexPage from './IndexPage';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <IndexPage />
        <Footer />
      </div>
    );
  }
}

export default App;
