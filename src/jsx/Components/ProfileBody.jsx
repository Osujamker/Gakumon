import React, { Component } from 'react';
import style from 'sass/profileBody.sass';
import {Input, Button, Form} from 'reactstrap';
export default class ProfileBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      messages: []
    }
  }
  render() {
    return(
      <div className="container profile-body">
        <div className="body-messages">
          <div className="messages-container containers">
            <h3 className="messages-title titles">Messages</h3>
            {this.state.isLoading && this.getMessages() && this.getFriends()}
            {this.state.messages.length > 0 && <DisplayMessages messages={this.state.messages}/>}
            <SubmitForm onClick={this.onClickHandle}/>
          </div>
        </div>
      </div>
    )
  }

  onClickHandle = (e) => {
    e.preventDefault();
    let message = e.target.message.value;
    e.target.message.value = '';
    fetch('/api/user/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({message, user: this.props.userInfo.user._id})
    })
    .then(request => request.json())
    .then(request => {
      this.getMessages();
    });
  }
  getMessages = () => {
    if (this.props.userInfo) {
      if (this.props.userInfo.user.messages) {
        fetch('/api/user/getMessages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({user: this.props.userInfo.user._id})
        })
        .then(request => request.json())
        .then(request => {
          this.setState({isLoading: false, messages: request});
        });
      }
    }
    return null;
  }
  getFriends = () => {
    if (this.props.userInfo) {
      if (this.props.userInfo.user.friends) {
        fetch('/api/user/getFriends', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({user: this.props.userInfo.user.friends})
        });
      }
    }
  }
}
class SubmitForm extends React.Component {
  render() {
    return (
      <Form onSubmit={this.props.onClick}>
        <br></br>
        <Input type="textarea" name="message"/>
        <br></br>
        <Button outline color="primary" size="lg" block>Send Message</Button>
        <br></br>
      </Form>
    );
  }
}
class DisplayMessages extends React.Component {
  render() {
    return (
      this.props.messages.map((message, index) => {
        return (
        <div className="message" key={index}>
          <div className="info">
            <h2>{message.user.username}</h2>
          </div>
          <div className="text">
            <h3>{message.message}</h3>
          </div>
        </div>
        );
      })
    );
  }
}