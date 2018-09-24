import React, { Component } from 'react';
import {Header} from '../Components/Index.jsx';
import style from 'sass/article.sass';
export default class Learn extends Component {
  constructor() {
    super();
    Article = Article.bind(this);
  }
  componentDidMount() {
    fetch('/api/news')
    .then(response => response.json())
    .then(news => this.setState({news}));
  }
  render() {
    return (
      <div className="Learn">
        <Header/>
        <div className="news container">
          <Article state={this.state} handleClick={this.handleClick}/>
        </div>
      </div>
    );
  }
  handleClick = (articleId) => {
    this.props.history.push({
      pathname: `/article/${articleId}`,
      state: { articleId }
    });
  }
}
class Article extends React.Component {
  render() {
    if (this.props.state) {
      return this.props.state.news.map((article, index) => {
        return (
          <div className="article" key={index}>
            <h1 className="title">{article.title}</h1>
            <button className="read" onClick={() => this.props.handleClick(article.id)}>Read more...</button>
          </div>
        );
      });
    }
    return null;
  }
}