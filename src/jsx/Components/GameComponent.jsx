import React, { Component } from 'react';
import style from 'sass/game.sass';
import japanese from '../../generateScript.js';
import {Button} from 'reactstrap';
export default class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practice: [],
      correct: 0,
      incorrect: 0,
      gameOver: false,
      pageButtons: []
    }
  }
  componentWillUnmount() {
    this.setState({
      correct: 0,
      incorrect: 0,
      gameOver: false,
      practice: []
    });
  }
  submitScore = () => {
    fetch('/api/user/practice', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({difficulty: this.props.difficulty, correct: this.state.correct, incorrect: this.state.incorrect})
    })
    .then(request => request.ok)
    .then(request => {
      console.log(request);
      this.props.history.push('/');
    })
  }
  render() {
    console.log(this.props.system);
    return (
      <div className="game container">
        <div className="wrapper">
        { this.state && !this.state.gameOver &&
          <Choices pageButtons={this.state.pageButtons} values={this.getScript(this.state.correct, this.state.incorrect)}/>
        }
        { this.state && this.state.gameOver &&
          <div className="gameOver">
            <div className="text">
              <h1>Game over!</h1>
              <h2>Correct answers: {this.state.correct}</h2>
              <h2>Wrong answers: {this.state.incorrect}</h2>
            </div>
            <div className="buttons">
              <Button onClick={this.submitScore}>Submit score</Button>
            </div>
          </div>
        }
        </div>
      </div>
    );
  }
  handleClick = (element, chosen) => {
    if (element.romaji === chosen.romaji) {
      this.setState(prevState => {
        correct: ++prevState.correct;
        pageButtons: prevState.pageButtons.push(<button className="correct" key={prevState.pageButtons.length}>{prevState.pageButtons.length}</button>);
      });
    }
    else {
      this.setState(prevState => {
        incorrect: ++prevState.incorrect
        pageButtons: prevState.pageButtons.push(<button className="incorrect" key={prevState.pageButtons.length}>{prevState.pageButtons.length}</button>);
      });
    }
    this.forceUpdate();
  }
  getScript = (correct, incorrect) => {
    let gameOver = this.checkWinCondition(correct, incorrect);
    let script = [];
    let chosen = [];
    let obj = japanese.Generate(this.props.system, 4, this.props.difficulty);
    console.log(obj[0]);
    japanese.Generate(this.props.system, 4, this.props.difficulty)[0].map((element, index) => {
      if (element.chosen) chosen = element;
      if (!gameOver) {
        script.push(
          <button key={index} onClick={() => this.handleClick(element, chosen)}>{element.romaji}</button>
        );
      }
    });
    return {script, chosen};
  }
  checkWinCondition = (correct, incorrect) => {
    if (correct + incorrect >= 4) {
      this.setState({gameOver: true});
      return true;
    }
    return false;
  }
}
class Choices extends React.Component {
  render() {
    return (
    <div className="main">
      <div className="script">
        <button>{this.props.values.chosen.hiragana}</button>
      </div>
      <div className="options">
        {this.props.values.script}
      </div>
      <div className="other">
        <div className="page">
          {this.props.pageButtons}
        </div>
        <div className="discussion" style={{display: 'none'}}>
          <button>Discussion</button>
        </div>
      </div>
    </div>
    );
  }
}