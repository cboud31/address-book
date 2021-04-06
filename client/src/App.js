import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../src/App.css';

import { NavBar, Home, About } from './components';

import ContactState from './context/contact/ContactState';

const App = () => {
  return (
    <ContactState>
      <Router>
        <>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </>
      </Router>
    </ContactState>
  );
};

export default App;
