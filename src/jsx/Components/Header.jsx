import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from 'sass/header.sass';
export default class Header extends Component {
  render() {
    return (
      <header id="topHeader" className="container">
        <Link to="/"><h3>Home</h3></Link>
        <Link to="/practice"><h3>Practice</h3></Link>
        <Link to="/learn"><h3>Learn</h3></Link>
        <Link to="/users"><h3>Users</h3></Link>
        <Link to="/settings"><h3>Settings</h3></Link>
        <a href="/api/logout"><h3>Logout</h3></a>
      </header>
    );
  }
}