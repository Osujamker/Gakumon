import React, { Component } from 'react';
import {Header, ArticleBody} from '../Components/Index.jsx';
export default class News extends Component {
  render() {
    return (
      <div className="Article">
        <Header/>
        <ArticleBody/>
      </div>
    );
  }
}