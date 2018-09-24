import React, { Component } from 'react';
import {Header, GameComponent} from '../Components/Index.jsx';
import generate from '../../generateScript.js';
import style from 'sass/game.sass';
export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.location.state;
    this.state.practice = generate.Generate(this.state.system, 4, this.state.difficulty);
    this.state.won = 0;
  }
  render() {
    return (
      <div className="Game">
        <Header/>
          <GameComponent system={this.state.system} difficulty={this.state.difficulty} handler={this.handler} history={this.props.history}/>
      </div>
    );
  }
  handler = (props) => {
    this.setState({won: props.won, practice: generate.Generate(this.state.system, 4, this.state.difficulty)})
  }
}