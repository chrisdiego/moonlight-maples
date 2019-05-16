import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import IndexPage from './IndexPage';
import AboutPage from './AboutPage';
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

library.add(fas, faEnvelope, faPhone);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/about" component={AboutPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
