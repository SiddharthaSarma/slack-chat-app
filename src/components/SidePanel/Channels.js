import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Icon, Input, Menu, Modal } from 'semantic-ui-react';
import { setCurrentChannel } from '../../actions';
import firebase from '../../firebase';

class Channels extends React.Component {
  state = {
    activeChannel: '',
    user: this.props.currentUser,
    channelRef: firebase.database().ref('channels'),
    channels: [],
    channelName: '',
    channelDetails: '',
    modal: false,
    firstChannelLoaded: true
  };

  componentDidMount() {
    this.addListeners();
  }

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelRef.on('child_added', snap => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
    });
  };

  setFirstChannel = () => {
    if (this.state.firstChannelLoaded && this.state.channels.length) {
      const channel = this.state.channels[0];
      this.displayChannels(channel);
      this.setState({ activeChannel: channel.id });
    }
  };
  addChannel = () => {
    const { channelRef, channelName, channelDetails, user } = this.state;
    const key = channelRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        user: user.displayName,
        avatar: user.photoURL
      }
    };

    channelRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelDetails: '', channelName: '' });
        this.closeModal();
      })
      .catch(err => console.error(err));
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  displayChannels = channels =>
    channels &&
    channels.length &&
    channels.map(channel => (
      <Menu.Item
        key={channel.id}
        name={channel.name}
        onClick={() => this.changeChannel(channel)}
        style={{ opacity: 0.7 }}
        active={channel.id === this.state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));

  isFormValid = state => {
    return state.channelName && state.channelDetails;
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  closeModal = () => this.setState({ modal: false });

  openModal = () => this.setState({ modal: true });

  changeChannel = channel => {
    this.props.setCurrentChannel(channel);
    this.setState({ activeChannel: channel.id });
  };

  render() {
    const { channels, modal } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: '2em' }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" />
              CHANNELS
            </span>{' '}
            ({channels.length})<Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>
        <Modal open={modal} close={this.closeModal}>
          <Modal.Header> Add a channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of the channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About the channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Close
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}
export default connect(
  null,
  { setCurrentChannel }
)(Channels);
