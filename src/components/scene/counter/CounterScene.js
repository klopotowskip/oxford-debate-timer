import React from 'react';

import LeftPane from './LeftPane';
import RightPane from './RightPane';

const TIME_LEFT = "Pozostało czasu:";
const TIME_UP = "Koniec czasu";

const LEFT_STATE = "PRO";
const RIGHT_STATE = "CONTRA";

export default class CounterScene extends React.Component {
  timeout = undefined;

  onKeyUp = (e) => {
    if(e.key === " "){
      console.log("space");
      if(this.state.paused) this.resumeTimer();
      else this.pauseTimer();
    }
  }
  componentDidMount(){
    document.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount(){
    document.removeEventListener('keyup', this.onKeyUp);
  }

  state = {
    isLeft: true,
    currentUser: 1,
    paused: true,
//    time: this.props.metadata.lduration
    time: 100
  }
  /*componentDidMount(){
    this.setState((state) => ({
      isleft: true,
      currentUser: 1
    }));
    console.log('done');
  }*/
  nextUser = () => {
    if(this.state.isLeft){
      this.setState(() => ({ isLeft: false }));
    } else {
      if(this.state.currentUser < 4) this.setState((prevState) => ({
        currentUser: prevState.currentUser + 1,
        isLeft: true
      }));
    }
  }

  reset = () => {
    this.setState(() => ({
      currentUser: 1,
      isLeft: true
    }))
  }

  printState = () => {
    return this.state.currentUser + " " + (this.state.isLeft ? LEFT_STATE : RIGHT_STATE);
  }

  getTimerHeader = () => {
    // TODO: Implement this method!
    return TIME_LEFT;
  }

  getTimerState = () => {
    let time = this.state.time;
    const minutes = (time-(time%600))/600;
    time -= minutes * 600;

    const seconds = (time-(time%10))/10;
    time -= seconds * 10;

    const dseconds = time;

    let text = "" + minutes + ":";

    if(seconds<10) text = text + "0" + seconds;
    else text = text + seconds;

    return text + "." + dseconds;
  }

  //TESTING
  testCountdown = () => {
    this.startTimer(100);
  }

  startTimer = (time) => {
    this.setState({
      paused: false,
      time
    }, () => {
      this.countdown();
    });
  }

  countdown = () => {
    this.setState((prevState) => ({ time: prevState.time - 1 }));
    if(this.state.time > 0 && (!this.state.paused)){
      this.timeout = window.setTimeout(this.countdown, 100);
    } else this.pauseTimer();
  }


  pauseTimer = () => {
    console.log("pause");
    this.setState({ paused: true }, () => {
      window.clearTimeout(this.timeout);
    });
  }
  resumeTimer = () => {
    console.log("resume");
    if(this.state.time){
      this.setState({ paused: false }, () => {
        this.countdown();
      });
    }
  }

  render(){
    return (
      <div className="main-container">
        <div className="left-pane">
          <LeftPane
            isLeft={this.state.isLeft}
            currentUser={this.state.currentUser}
          />
        </div>
        <div className="center-pane">
          <header className="center-pane-header">
            <h2 className="center-pane-header__text center-pane-header--topic">Topic: {this.props.metadata.topic}</h2>
            <h3 className="center-pane-header__text center-pane-header--state">{this.printState()}</h3>
          </header>
          <hr className="center-pane--line"/>
          <div className="timer-container">
            <h3 className="timer-container--header">{this.getTimerHeader()}</h3>
            <div className="timer-container--timer-box">{this.getTimerState()}</div>
          </div>
        </div>
        <div className="right-pane">
          <RightPane
            isLeft={this.state.isLeft}
            currentUser={this.state.currentUser}
          />
        </div>
        <button onClick={this.nextUser}>Next</button>
        <button onClick={this.reset}>Reset</button>
        <button onClick={this.testCountdown}>Countdown</button>
        <button onClick={this.pauseTimer}>Stop</button>
      </div>
    );
  }
}
