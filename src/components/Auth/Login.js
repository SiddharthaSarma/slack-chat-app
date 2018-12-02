import React, { Component } from 'react';
import {
  Grid,
  Form,
  Message,
  Segment,
  Button,
  Header,
  Icon
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Login extends Component {
  state = {
    email: '',
    password: '',
    loading: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toggleLoading = () => {
    this.setState(state => {
      return { loading: !state.loading };
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (!this.isFormValid()) {
      return false;
    }
    this.toggleLoading();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(value => {
        this.toggleLoading();
        console.log(value);
      })
      .catch(err => {
        this.toggleLoading();
        console.log(err);
      });
  };

  isFormValid = () => {};

  isFormEmpty = () => this.state.email && this.state.password;

  render() {
    const { email, password } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Login to devchat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                type="email"
                fluid
                name="email"
                placeholder="Email"
                icon="mail"
                iconPosition="left"
                onChange={this.handleChange}
                value={email}
              />
              <Form.Input
                type="password"
                fluid
                name="password"
                placeholder="Password"
                icon="lock"
                iconPosition="left"
                onChange={this.handleChange}
                value={password}
              />
              <Button
                className={this.state.loading ? 'ui loading button' : null}
                fluid
                color="violet"
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Don't have an account <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
