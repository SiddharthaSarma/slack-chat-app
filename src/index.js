import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { App } from './components/App';
import firebase from './firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';
import { setUser } from './actions';
import 'semantic-ui-css/semantic.min.css';
import './styles.css';

const store = createStore(rootReducer, composeWithDevTools());

class Root extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push('/');
      }
    });
  }
  render() {
    return (
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

const RootWithAuth = withRouter(
  connect(
    null,
    { setUser }
  )(Root)
);

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  rootElement
);
