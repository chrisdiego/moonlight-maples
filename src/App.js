import React, { Component } from 'react';
import Header from './Header';
import IndexPage from './IndexPage';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App bg-light">
        <Header />
        <IndexPage />
      </div>
    );
  }
}

export default App;
