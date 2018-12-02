import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { App } from './components/App';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './styles.css';

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </Router>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
