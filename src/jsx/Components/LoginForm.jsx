import React, { Component } from 'react';
import style from 'sass/registration.sass';
export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    }
  }
  renderLogin = () => {
    return(
      <div className="container-fluid form">
        <div className="title">
          <h2 className="text">Sign in to Gakumon</h2>
        </div>
        <form className="login" onSubmit={this.handleClick}>
          <label htmlFor="username">Username or email address:</label>
          <input name="username" type="username" className="username"></input>
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" className="password"></input>
          <button className="submit">Sign in</button>
        </form>
        <div className="new-account">
          <h3>New to Gakumon? <a href="/registration" onClick={this.handleRegistrationLink}>create new account</a></h3>
        </div>
      </div>
    )
  }
  handleRegistrationLink = (e) => {
    e.preventDefault();
    this.props.history.push('/registration')
  }
  handleLoginLink = (e) => {
    e.preventDefault();
    this.props.history.push('/login')
  }
  renderRegistration = () => {
    return(
      <div className="container-fluid form">
        <div className="title">
          <h2 className="text">Sign up to Gakumon</h2>
        </div>
        <form className="login" onSubmit={this.handleClick}>
          <label htmlFor="username">Username or email address:</label>
          <input name="username" type="username" className="username"></input>
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" className="password"></input>
          <button className="submit">Sign up</button>
        </form>
        <div className="new-account">
          <h3>Already have an account? <a href="/login" onClick={this.handleLoginLink}>login to Gakumon</a></h3>
        </div>
      </div>
    )
  }
  render() {
    if(this.state.isLoggedIn) {
      this.props.history.push('/');
    }
    if (this.props.login) return this.renderLogin();
    else return this.renderRegistration();
  }
  handleClick = (e) => {
    e.preventDefault();
    if (this.props.login) {
      fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({password: e.target.password.value, username: e.target.username.value}),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if(res.success) {
          this.setState({isLoggedIn: true});
        }
      })
    }
    else {
      fetch('/api/registration', {
        method: 'POST',
        body: JSON.stringify({password: e.target.password.value, username: e.target.username.value}),
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => response.json())
      .then(res => {
        if(res.success) {
          this.setState({isLoggedIn: true});
        }
      })
    }
  }
}