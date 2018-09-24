import React, { Component } from 'react';
import {LoginForm} from '../Components/Index.jsx';
export default class Login extends Component {
  render() {
    if (this.props.match.url === "/registration") {
      return (
        <div className="Registration">
          <LoginForm login={false} history={this.props.history}/>
        </div>
      );
    }
    else {
      return (
        <div className="Login">
          <LoginForm login={true} history={this.props.history}/>
        </div>
      );
    }
  }
}