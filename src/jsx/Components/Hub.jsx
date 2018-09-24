import React, { Component } from 'react';
import style from 'sass/hub.sass';
import {PracticeBody} from './Index.jsx';
export default class Hub extends Component {

  constructor() {
    super();
    this.state = {}
  }
  render() {
    if (this.state.system) {
      return <PracticeBody system={this.state.system} onClick={this.handleClick}/>;
    }
    return(
      <div id="hub" className="container">
        <div>
          <div className="title">
            <h2>Choose a writing system</h2>
            <h3>Click on one of the boxes below</h3>
          </div>
          <div className="button-container">
            <div id="buttons">
              <Button title="あ" system="Hiragana" onClick={this.handleClick}/>
              <Button title="ア" system="Katakana" onClick={this.handleClick}/>
            </div>
            <div className="help">
              <h3>Choose Hiragana if uncertaint</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
  handleClick = (props) => {
    this.setState({system: props.system});
  }
}
class Button extends React.Component {
  render() {
    return (
      <button id={this.props.id} onClick={(event) => this.props.onClick(this.props)}>
        <h3 className="script">{this.props.title}</h3>
        <h3 className="system">{this.props.system}</h3>
      </button>
    );
  }
}