import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import style from 'sass/header.sass';
export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }
  render() {
    return (
      <header id="topHeader" className="container">
        {this.state.redirect && this.redirect()}
        <Link to="/"><h3>Home</h3></Link>
        <Link to="/practice"><h3>Practice</h3></Link>
        <Link to="/learn"><h3>Learn</h3></Link>
        <Link to="/users"><h3>Users</h3></Link>
        <Link to="/settings"><h3>Settings</h3></Link>
        <Link to="/api/logout" onClick={this.handleClick}><h3>Logout</h3></Link>
      </header>
    );
  }
  redirect = () => {
    return <Redirect to="/login"/>
  }
  handleClick = (e) => {
    e.preventDefault();
    fetch('/api/logout')
    .then()
    .then(() => {
      this.setState({redirect: true});
    });
  }
}