import React, { Component } from 'react';
import style from 'sass/practice.sass';
import {Redirect} from 'react-router';
export default class PracticeBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      system: 'hiragana'
    };
  }
  renderRedirect = () => {
    return <Redirect push to={{pathname: '/practice/game', state: {difficulty: this.state.difficulty, system: this.props.system}}}/>
  }
  redirectHardDifficulty = () => {
    this.setState({redirect: true, difficulty: 'hard'});
  }
  redirectNormalDifficulty = () => {
    this.setState({redirect: true, difficulty: 'normal'});
  }
  redirectEasyDifficulty = () => {
    this.setState({redirect: true, difficulty: 'easy'});
  }
  handleOnClickBack = () => {
    this.props.onClick({});
  }
  renderKatakana() {
    return (
      <div id="katakana" className="container">
        <div className="title">
          <h2>Choose a difficulty</h2>
          <h3>Click on one of the boxes below</h3>
        </div>
        <div className="button-container">
          <div className="buttons">
            <button onClick={this.redirectEasyDifficulty}>
              <h3 className="script">ア</h3>
              <h3 className="system">No prior knowledge</h3>
            </button>
            <button onClick={this.redirectNormalDifficulty}>
              <h3 className="script">ヒ</h3>
              <h3 className="system">Basic knowledge</h3>
            </button>
            <button onClick={this.redirectHardDifficulty}>
              <h3 className="script">ポ</h3>
              <h3 className="system">Good knowledge</h3>
            </button>
          </div>
          <div className="help">
            <button onClick={this.handleOnClickBack}>Back</button>
          </div>
        </div>
      </div>
    );
  }
  renderHiragana = () => {
    return (
      <div id="hiragana" className="container">
        <div className="title">
          <h2>Choose a difficulty</h2>
          <h3>Click on one of the boxes below</h3>
        </div>
        <div className="button-container">
          <div className="buttons">
            <button onClick={this.redirectEasyDifficulty}>
              <h3 className="script">あ</h3>
              <h3 className="system">No prior knowledge</h3>
            </button>
            <button onClick={this.redirectNormalDifficulty}>
              <h3 className="script">き</h3>
              <h3 className="system">Basic knowledge</h3>
            </button>
            <button onClick={this.redirectHardDifficulty}>
              <h3 className="script">にゃ</h3>
              <h3 className="system">Good knowledge</h3>
            </button>
          </div>
          <div className="help">
            <button onClick={this.handleOnClickBack}>Back</button>
          </div>
        </div>
      </div>
    );
  }
  render() {
    if (this.state.redirect) return this.renderRedirect()
    if (this.props.system.toLowerCase() === 'hiragana') return this.renderHiragana();
    return this.renderKatakana();
  }
}