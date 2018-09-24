import React, { Component } from 'react';
import {Header} from '../Components/Index.jsx';
import style from 'sass/articleBody.sass';
export default class Article extends Component {
  componentDidMount() {
    let pathName = this.props.location.pathname;
    let articleId = pathName.substr(pathName.lastIndexOf('/') + 1);
    fetch('/api/article', {
      method: 'POST',
      body: JSON.stringify({articleId}),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(request => request.json())
    .then(article => this.setState({article}))
  }
  render() {
    return (
      <div className="Article">
        <Header/>
        <ArticleBody state={this.state} createMarkup={this.createMarkup}/>
      </div>
    );
  }
  createMarkup = (text) => {
    return {__html: text}
  }
}
class ArticleBody extends React.Component {
  render() {
    if (this.props.state) {
      return (
        <div className="article container">
          <h1 className="title">{this.props.state.article.title}</h1>
          <h3 className="text" dangerouslySetInnerHTML={this.props.createMarkup(this.props.state.article.text)}></h3>
        </div>
      );
    }
    return null;
  }
}