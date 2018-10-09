import React, { Component } from 'react';
import {Header, ProfileHeader, SettingsForm} from '../Components/Index.jsx';
export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: [],
      isLoading: true
    }
  }
  render() {
    if (this.state.isLoading) this.getUser();
    else {
      return (
        <div className="Settings">
          <Header/>
          { this.state.userInfo &&
          <ProfileHeader userInfo={this.state.userInfo}/>
          }
          <SettingsForm onClick={this.handleClick} history={this.props.history}/>
        </div>
      );
    }
    return <Header/>;
  }
  getUser = () => {
    fetch('/api/isloggedin', {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => {
      if (!res.username) this.props.history.push('/registration');
      else this.setState({userInfo: {user: res, isYou: true}, isLoading: false});
    });
  }
  handleClick = () => {
    
  }
}