import React from 'react';
import {connect} from 'react-redux';
import { Grid } from 'semantic-ui-react';
import SidePanel from './SidePanel/SidePanel';
import ColorPanel from './ColorPanel/ColorPanel';
import MetaPanel from './MetaPanel/MetaPanel';
import MessagePanel from './MessagePanel/MessagePanel';

const App = ({currentUser}) => (
  <Grid columns="equal" style={{ background: '#eee' }}>
    <ColorPanel />
    <SidePanel currentUser={currentUser}/>
    <Grid.Column style={{ marginLeft: 320 }}>
      <MessagePanel />
    </Grid.Column>
    <Grid.Column width={4}>
      <MetaPanel />
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})
export default connect(mapStateToProps)(App);