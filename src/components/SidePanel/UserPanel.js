import React, { Component } from 'react';
import { Header, Grid, Icon, Dropdown } from 'semantic-ui-react';
import firebase from '../../firebase';

class UserPanel extends Component {
  state = {
    user: this.props.currentUser
  }
  getDropdownOptions = () => [
    {
      key: 'user',
      text: <span>Signed in as <strong>{this.state.user ? this.state.user.displayName: 'dummy'}</strong></span>
    },
    {
      key: 'signout',
      text: <span onClick={this.signOutUser}>Sign out</span>
    }
  ];

  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(response => console.log('logged out'))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            <Header inverted floated="left">
              <Icon name="code" />
              <Header.Content>Devchat</Header.Content>
            </Header>
          </Grid.Row>
          <Header style={{ padding: '0.25em' }} as="h4" inverted>
            <Dropdown
              trigger={<span>{this.state.user ? this.state.user.displayName: 'User'}</span>}
              options={this.getDropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
