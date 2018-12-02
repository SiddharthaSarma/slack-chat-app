import React, { Component } from 'react';
import md5 from 'md5';
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
    passwordConfirmation: '',
    loading: false,
    usersRef: firebase.database().ref('users')
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
    if (!this.isFormValid) {
      return false;
    }
    this.toggleLoading();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => {
        createdUser.user
          .updateProfile({
            displayName: this.state.username,
            photoURL: `http://gravatar.com/avatar/${md5(
              createdUser.user.email
            )}?d=identicon`
          })
          .then(() =>
            this.saveUser(createdUser).then(() => {
              this.toggleLoading();
              console.log('user created');
            })
          )
          .catch(err => console.error(err));
      })
      .catch(err => {
        this.toggleLoading();
        console.error(err);
      });
  };

  isFormValid = () => {
    if (this.isFormEmpty()) {
      return false;
    } else if (this.isPasswordLengthShort()) {
      return false;
    } else if (this.isPasswordsDoesnotMatch()) {
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    return !username || !email || !password || !passwordConfirmation;
  };

  isPasswordLengthShort = () => {
    return this.state.password.length < 6;
  };

  isPasswordsDoesnotMatch = () => {
    return this.state.password === this.state.passwordConfirmation;
  };

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
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
              <Button
                className={this.state.loading ? 'ui loading button' : null}
                fluid
                color="orange"
              >
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
