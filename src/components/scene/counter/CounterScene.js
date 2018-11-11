import React from 'react';

import LeftPane from './LeftPane';
import RightPane from './RightPane';

const TIME_LEFT = "Pozostało czasu:";
const TIME_UP = "Koniec czasu";

const END_OF_EVENT = "Koniec debaty";

const LEFT_STATE = "PRO";
const RIGHT_STATE = "CONTRA";

const LONG_SPEECH = "long";
const SHORT_SPEECH = "short";

const LEFT_SIDE = "left";
const RIGHT_SIDE = "right";

const SHORT = "ad vocem";

export default class CounterScene extends React.Component {
  timeout = undefined;
  defaultLifecycle = [];


  onKeyUp = (e) => {
    if(e.key === " "){
      if(this.state.paused) this.resumeTimer();
      else this.pauseTimer();
    } else if(e.key === "Enter"){
      if(this.state.paused && this.state.hasStarted) this.pushQueue();
      else this.pauseTimer();
    }
  }
  componentDidMount(){
    window.setTimeout(() => {
      document.addEventListener('keyup', this.onKeyUp);
    }, 200);

  }

  componentWillUnmount(){
    document.removeEventListener('keyup', this.onKeyUp);
  }

  state = {
    isLeft: true,
    currentUser: 1,
    paused: true,
    time: parseInt(this.props.metadata.lduration),
    timerHeader: TIME_LEFT,
// First speech is loaded on startup
    queue: [
      LONG_SPEECH,
      LONG_SPEECH,
      LONG_SPEECH,
      LONG_SPEECH,
      LONG_SPEECH,
      LONG_SPEECH,
      LONG_SPEECH
    ],
    leftShorts: parseInt(this.props.metadata.squantity),
    rightShorts: parseInt(this.props.metadata.squantity),
    inShort: false,
    shortQueued: false,
    shortSide: `none`,
    hasStarted: false,
  }
  nextUser = () => {
    if(this.state.isLeft){
      this.setState(() => ({ isLeft: false }));
    } else {
      if(this.state.currentUser < 4) this.setState((prevState) => ({
        currentUser: prevState.currentUser + 1,
        isLeft: true,
        inShort: false
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
    if(this.state.inShort) return SHORT;
    else return this.state.currentUser + " " + (this.state.isLeft ? LEFT_STATE : RIGHT_STATE);
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
      this.setState({ paused: false, hasStarted: true }, () => {
        this.countdown();
      });
    }
  }

  pushQueue = () => {
    if(this.state.queue.length == 0) return;
    let queue = [...this.state.queue];
    const newElement = queue.pop();

    let time = 0;
    switch(newElement){
      case LONG_SPEECH:
        time = this.props.metadata.lduration;
        break;
      case SHORT_SPEECH:
        time = this.props.metadata.sduration;
        break;
    }
    let inShort = newElement === SHORT_SPEECH;
    this.setState({
      time,
      queue,
      inShort,
      shortQueued : false,
      shortSide: null,
      hasStarted: false
    }, () => {
      if(newElement === LONG_SPEECH){
        this.nextUser();
      }
    });
  }

  handleUseLeftShort = () => {
    if(this.state.inShort && this.state.shortSide==='left') return;
    //if(this.state.currentUser === 4) return;
    if(this.state.isLeft === true) return;
    if(this.state.shortQueued === true) return;

    this.setState((prevState) => ({
      leftShorts: prevState.leftShorts - 1,
      shortQueued: true,
      shortSide: `left`,
      queue: [...prevState.queue, SHORT_SPEECH]
    }));
  }

  handleUseRightShort = () => {
    if(this.state.inShort && this.state.shortSide==='right') return;
    if(this.state.shortQueued === true) return;
    if(this.state.isLeft === false) return;

    this.setState((prevState) => ({
      rightShorts: prevState.rightShorts - 1,
      shortQueued: true,
      shortSide: `right`,
      queue: [...prevState.queue, SHORT_SPEECH]
    }));

  }

  render(){
    return (
      <div className="main-container">
        <div className="left-pane">
          <LeftPane
            isLeft={this.state.isLeft}
            currentUser={this.state.currentUser}
            hideCurrent={this.state.inShort}
            shortsAvailable={this.state.leftShorts}
            shortDuration={this.props.metadata.sduration}
            handleUseShort={this.handleUseLeftShort}
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
            hideCurrent={this.state.inShort}
            shortsAvailable={this.state.rightShorts}
            shortDuration={this.props.metadata.sduration}
            handleUseShort={this.handleUseRightShort}
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
