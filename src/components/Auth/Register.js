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

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => {
        console.log(createdUser);
      })
      .error(err => console.error(err));
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for devchat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                type="text"
                fluid
                name="username"
                placeholder="User name"
                icon="user"
                iconPosition="left"
                onChange={this.handleChange}
                value={username}
              />
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
              <Form.Input
                type="password"
                fluid
                name="passwordConfirmation"
                placeholder="Password Confirmation"
                icon="repeat"
                iconPosition="left"
                onChange={this.handleChange}
                value={passwordConfirmation}
              />
              <Button fluid color="orange">
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a User <Link to="/">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
