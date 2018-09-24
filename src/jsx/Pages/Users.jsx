import React, { Component } from 'react';
import {Header, ProfileHeader} from '../Components/Index.jsx';

export default class User extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    }
  }
  getUsers = () => {
    fetch("/api/users")
    .then(response => response.json())
    .then(users => {
      this.setState({isLoading: false, users: users});
    });
  }
  render() {
    if (this.state.isLoading) {
      this.getUsers();
    }
    else {
      return(
      <React.Fragment>
        <Header/>
        {this.state.users.map((userInfo, index) => {
          return <ProfileHeader userInfo={userInfo} key={index}/>
        })}
      </React.Fragment>
      );
    }
    return <Header/>
  }
}