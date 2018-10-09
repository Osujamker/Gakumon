import React, { Component } from 'react';
import {Header, ProfileHeader, ProfileBody} from '../Components/Index.jsx';
export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    }
  }
  isLoggedIn = () => {
    fetch("/api/isloggedin", {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => {
      console.log(res);
      if (!res.username){
        this.props.history.push('/registration');
      }
      else if (res) {
        this.setState({userInfo: {user: res, isYou: true}, isLoading: false});
      }
    });
  }
  render() {
    if (this.state.isLoading) this.isLoggedIn();
    return (
      <div className="Profile">
        <Header/>
        { !this.state.isLoading &&
        <ProfileHeader userInfo={this.state.userInfo}/>
        }
        <ProfileBody userInfo={this.state.userInfo}/>
      </div>
    )
  }
}