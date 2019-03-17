import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import IndexPage from './IndexPage';
import AboutPage from './AboutPage';
import './App.scss';

class App extends Component {
  render() {
    return (
      <HashRouter basename="/">
        <div className="App">
          <Header />
            <Switch>
          	 <Route path="/" exact component={IndexPage} />
          	 <Route path="/about" component={AboutPage} />
            </Switch>
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

export default App;
