import React, { Component } from 'react';
import style from 'sass/settingsForm.sass';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default class SettingsForm extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    }
  }
  render() {
    return(
      <form className="settings container" onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username or email address:</label>
        <input type="username" name="username" className="username"></input>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" className="password"></input>
        <button>Update</button>
        <a href="/api/delete_account" onClick={this.handleClick}>I want to delete my account</a>
        {this.confirmAccountDeletionModal()}
      </form>
    )
  }
  toggleModal = () => {
    this.setState({modalOpen: !this.state.modalOpen});
  }
  confirmAccountDeletionModal = () => {
    return (
      <div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>DO YOU REALLY WANT TO DELETE YOUR ACCOUNT?</ModalHeader>
          <ModalBody>THIS ACTION IS IRREVERSIBLE!</ModalBody>
          <ModalFooter>
            <Button onClick={this.toggleModal}>Cancel</Button>
            <Button color="danger" onClick={this.handleAccountDeletion}>Delete my account</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  handleClick = (e) => {
    e.preventDefault();
    this.setState({modalOpen: true});
  }
  handleAccountDeletion = (e) => {
    e.preventDefault();
    fetch('/api/user/delete_account', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({confirmation: 'I REALLY WANT TO DELETE MY ACCOUNT'})
    })
    .then(response => response.ok)
    .then(() => {
      this.props.history.push('/login');
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let credentials = {username: e.target.username.value, password: e.target.password.value};
    fetch('/api/settings', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(response => response.json())
    .then(response => console.log(response));
    this.forceUpdate();
  }
}