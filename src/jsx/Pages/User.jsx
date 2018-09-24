import React, { Component } from 'react';
import {Header, ProfileBody, ProfileHeader} from '../Components/Index.jsx';

export default class User extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    }
  }
  getUser = () => {
    let promise = fetch("/api/user", {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({username: this.props.match.params.username})
    })
    .then(response => response.json())
    .then(res => {
      this.setState({user: res, isLoading: false});
    });
    return promise;
  }
  renderProfile = () => {
    return (
      <div className="Profile">
        <Header/>
        <ProfileHeader userInfo={this.state.user}/>
        <ProfileBody userInfo={this.state.user}/>
      </div>
    );
  }
  render() {
    if (!this.state.isLoading) {
      return this.renderProfile()
    }
    else {
      this.getUser();
    }
    return null;
  }
}