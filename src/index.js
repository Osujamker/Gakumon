import React from 'react';
import ReactDOM from 'react-dom';
import {Profile, Practice, Learn, User, Settings, Login, Game, Article, Users} from './jsx/Pages/Index.jsx';
import {BrowserRouter as Router, Route} from 'react-router-dom';
ReactDOM.render(
  <Router>
    <div id="root">
      <Route exact path="/" component={Profile}/>
      <Route path="/user" component={User}/>
      <Route exact path="/users" component={Users}/>
      <Route exact path="/practice" component={Practice}/>
      <Route exact path="/learn" component={Learn}/>
      <Route exact path="/settings" component={Settings}/>
      <Route path="/article" component={Article}/>
      <Route exact path="/practice/game" component={Game}/>
      <Route exact path="/registration" component={Login}/>
      <Route exact path="/login" component={Login}/>
    </div>
  </Router>,
  document.getElementById('root')
);
