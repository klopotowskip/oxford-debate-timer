import React from 'react';

import LeftPane from './LeftPane';
import RightPane from './RightPane';

import Side from '~/src/model/Side';
import SpeechType from '~/src/model/SpeechType';

import Speech from '~/src/model/Speech';

import EndingModal from './EndingModal';

import { getCounterMessages } from '~/src/locale/locale-supplier';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndoAlt as undo, faVolumeUp as soundsOn, faVolumeOff as soundsOff } from '@fortawesome/free-solid-svg-icons';


//Defines the time since which timer will be displayed in red
const RED_TEXT_TIMER = 100;

const messages = getCounterMessages();

const INIT_QUEUE = [
  // First speech is loaded on startup
  new Speech(SpeechType.LONG, Side.RIGHT, 1),

  new Speech(SpeechType.LONG, Side.LEFT, 2),
  new Speech(SpeechType.LONG, Side.RIGHT, 2),

  new Speech(SpeechType.LONG, Side.LEFT, 3),
  new Speech(SpeechType.LONG, Side.RIGHT, 3),

  new Speech(SpeechType.LONG, Side.LEFT, 4),
  new Speech(SpeechType.LONG, Side.RIGHT, 4),
];

const parseBool = (bool) => {
  return (bool == 'true') ? true: false;
}

export default class CounterScene extends React.Component {

  state = {
    //Current speaker number (integers from 1 to 4)
    speaker: 1,
    //Current speaker team
    side: Side.LEFT,

    //Defines whether current speech has EVER started
    hasStarted: false,

    //Defines whether counter is now in short speech time
    inShort: false,

    //Shows number of available shorts for the teams
    leftShorts: parseInt(this.props.metadata.squantity),
    rightShorts: parseInt(this.props.metadata.squantity),

    //Defines whether times is paused RIGHT NOW
    paused: true,

    playWarningSound: false,

    playEndSound: false,

    //Speeches queue
    queue: INIT_QUEUE,

    //Defines whether any short is queued as a next speech
    shortQueued: false,

    //Current timer header
    timerHeader: messages.TIME_LEFT,

    //Time left for current speech (defined in 1/10 seconds)
    time: parseInt(this.props.metadata.lduration),

    //Defines if event has reached it's end
    hasEnded: false,

    //Defines whether sounds are enabled
    soundsEnabled: parseBool(localStorage.getItem('soundsEnabled')),

    //Defines whether ending modal is open at this moment
    openEndingModal: false
  }

  timeout = undefined;

  startingTimesShort = []; //Array stores timestamps in which warning sounds are starting (for short speeches)
  startingTimesLong = []; //Array stores timestamps in which warning sounds are starting (for long speeches)

  endingTimesShort = []; //Array stores timestamps in which warning sounds are ending (for short speeches)
  endingTimesLong = []; //Array stores timestamps in which warning sounds are ending (for long speeches)


  speechEndTimes = []; //Array stores informations about past speeches time of end

  defineAlarmsTimes = () => {
    const sduration = this.props.metadata.sduration;
    const lduration = this.props.metadata.lduration;
    const upperMargin = 4;
    const lowerMargin = 4;

    if(sduration == 300){
      this.startingTimesShort.push(150 + upperMargin);
      this.endingTimesShort.push(150 - lowerMargin);
    } else {
      this.startingTimesShort.push(sduration - 300 + upperMargin);
      this.endingTimesShort.push(sduration - 300 - lowerMargin);
    }

    this.startingTimesLong.push(lduration - 300 + upperMargin);
    this.endingTimesLong.push(lduration - 300 - lowerMargin);

    this.startingTimesLong.push(300 + upperMargin);
    this.endingTimesLong.push(300 - lowerMargin);

  };

  componentDidMount(){
    window.setTimeout(() => {
      document.addEventListener('keyup', this.onKeyUp);
    }, 200);

    //Prevent user from leaving page accidentally
    window.onbeforeunload = function() {
      return messages.FAREWELL;
    }

    this.defineAlarmsTimes();

    localStorage.setItem('soundsEnabled', this.state.soundsEnabled);
  }

  componentWillUnmount(){
    document.removeEventListener('keyup', this.onKeyUp);
    window.onbeforeunload = undefined;
  }


  /**
    *  Function controlling all the keyboard events in this scene and in this app
    *
  */
  onKeyUp = (e) => {
    if(this.state.playEndSound) {
      this.setState(() => ({
        playEndSound: false
      }));
    }
    if(e.key === " "){
      if(this.state.paused) this.resumeTimer();
      else this.pauseTimer(false);
    } else if(e.key === "Enter"){
      if(this.state.paused && this.state.hasStarted) this.pushQueue();
      else this.pauseTimer();
    }
  };

  reset = () => {
    this.setState(() => ({
      speaker: 1,
      side: Side.LEFT,
      queue: INIT_QUEUE
    }));
  };

  printState = () => {
    if(this.state.hasEnded) return "";
    const inShort = this.state.inShort;
    let side;
    switch(this.state.side){
      case Side.LEFT:
        side = inShort ? messages.LEFT_SIDE_LABEL : messages.LEFT_SIDE_DISPLAYED_NAME;
        break;
      case Side.RIGHT:
        side = inShort ? messages.RIGHT_SIDE_LABEL : messages.RIGHT_SIDE_DISPLAYED_NAME;
    }
    if(inShort) return side + " – " + messages.SHORT_SPEECH_LABEL;
    else return this.state.speaker + " " + side;
  };

  getTimerState = () => {
    let time = this.state.time;
    const minutes = (time-(time%600))/600;
    time -= minutes * 600;

    const seconds = (time-(time%10))/10;
    time -= seconds * 10;

    let dseconds = time;

    let text = "" + minutes + ":";

    if(seconds<10) text = text + "0" + seconds;
    else text = text + seconds;

    if(dseconds < 0) dseconds = 0

    let cssClass = this.state.time <= RED_TEXT_TIMER? ' timer-container__content--red': '';
    return (
      <div className={"timer-container__content" + cssClass}>
        {text}<span className="timer-container__dseconds-span">{"." + dseconds}</span>
      </div>
    );
  };

  startTimer = (time) => {
    this.setState({
      paused: false,
      time
    }, () => {
      this.countdown();
    });
  };

  countdown = () => {
    const time = parseInt(this.state.time);

    if(this.state.soundsEnabled){
      //Sound playing block
      if(this.state.inShort){
        if(this.startingTimesShort.includes(time)){
          this.setState(() => ({
            playWarningSound: true
          }));
        }

        //Sound pausing block
        if(this.endingTimesShort.includes(time)){
          this.setState(() => ({
            playWarningSound: false
          }));
        }
      } else {
        if(this.startingTimesLong.includes(time)){
          this.setState(() => ({
            playWarningSound: true
          }));
        }

        //Sound pausing block
        if(this.endingTimesLong.includes(time)){
          this.setState(() => ({
            playWarningSound: false
          }));
        }
      }

    }


    this.setState((prevState) => ({ time: prevState.time - 1 }));
    if(this.state.time > 0 && (!this.state.paused)){
      this.timeout = window.setTimeout(this.countdown, 100);
    } else {
      this.pauseTimer(true);
    }
  };

  /**
   * Pauses timer
   *
   * @param {boolean} endOfTime - Defines if timer is paused because it's end of time
   */
  pauseTimer = (endOfTime) => {
    const timerHeader = endOfTime ? messages.TIME_UP : messages.TIMER_PAUSED;
    this.setState({
      paused: true,
      timerHeader: timerHeader,
      playEndSound: (this.state.soundsEnabled && endOfTime)
    }, () => {
      window.clearTimeout(this.timeout);
    });
  };

  resumeTimer = () => {
    if(this.state.time){
      this.setState({
        paused: false,
        hasStarted: true,
        timerHeader: messages.TIME_LEFT
      }, () => {
        this.countdown();
      });
    }
  };

  pushQueue = () => {
    this.speechEndTimes = [...this.speechEndTimes, {
      speaker: this.state.speaker,
      side: this.state.side,
      time: this.state.time
    }];

    if(this.state.queue.length == 0){
      this.die();
      return;
    }
    let newSpeech;
    let queue = [...this.state.queue];
    [newSpeech, ...queue] = [...queue];

    switch(newSpeech.getType()){
      case SpeechType.LONG:
        this.prepareLongSpeech(
          newSpeech.getSpeaker(),
          newSpeech.getSide(),
          queue
        );
        break;

      case SpeechType.SHORT:
        this.prepareShortSpeech(
          newSpeech.getSide(),
          queue
        );
        break;
    }
  };

  prepareLongSpeech = (speaker, side, queue) => {
    this.setState({
      hasStarted: false,
      inShort: false,
      queue,
      shortQueued : false,
      playEndSound: false,
      side,
      speaker,
      time: this.props.metadata.lduration,
      timerHeader: messages.TIME_LEFT
    });
  };

  prepareShortSpeech = (side, queue) => {
    this.setState(() => ({
      side,
      hasStarted: false,
      inShort: true,
      queue,
      shortQueued: false,
      playEndSound: false,
      time: this.props.metadata.sduration,
      timerHeader: messages.TIME_LEFT
    }));
  };

  handleUseLeftShort = () => {

    this.setState((prevState) => ({
      leftShorts: prevState.leftShorts - 1,
      shortQueued: true,
      queue: [
        new Speech(
          SpeechType.SHORT,
          Side.LEFT
        ), ...prevState.queue
      ]
    }));
  };

  handleUseRightShort = () => {

    this.setState((prevState) => ({
      rightShorts: prevState.rightShorts - 1,
      shortQueued: true,
      queue: [
        new Speech(
          SpeechType.SHORT,
          Side.RIGHT
        ), ...prevState.queue
      ]
    }));

  };

  canUseShort = (side) => {
    return (
      (this.state.side !== side) &&
      (this.state.speaker !== 4) &&
      (this.state.shortQueued === false));
  };

  /**
   * End the debate
   */
  die = () => {
    window.onbeforeunload = undefined;
    this.setState(() => ({
      timerHeader: messages.END_OF_EVENT,
      playEndSound: false,
      openEndingModal: true,
      hasEnded: true //When event ends, we don't want any of the icons to be highlighted
    }));
  };

  closeModal = () => {
    this.setState(() => ({
      openEndingModal: false
    }));
  };

  switchSound = () => {
    this.setState((prevState) => ({
      soundsEnabled: !prevState.soundsEnabled
    }), () => { localStorage.setItem('soundsEnabled', this.state.soundsEnabled); });
    document.getElementById("sound-control-button").blur();
  };

  render(){
    return (

      <div>
        {this.state.openEndingModal ?
          <EndingModal
            closeModal={this.closeModal}
            speechEndTimes={this.speechEndTimes}
          />
        : ""}

        {this.state.playEndSound ?
          <audio src="audio/end.ogg" loop autoPlay></audio>
        : ""}
        {this.state.playWarningSound ?
          <audio src="audio/hit.ogg" loop autoPlay></audio>
        : ""}
        <div className="main-container">
          <LeftPane
            side={this.state.side}
            speaker={this.state.speaker}
            hideCurrent={this.state.inShort}
            shortsAvailable={this.state.leftShorts}
            shortDuration={this.props.metadata.sduration}
            handleUseShort={this.handleUseLeftShort}
            canUseShort={this.canUseShort}
          />
          <div className="center-pane">
            <div className="center-pane-content">
              <header className="center-pane-header">
                <img src="/images/logo.png" className="center-pane__logo"/>
                <h2 className="center-pane-header__text center-pane-header--topic"> {this.props.metadata.topic ? messages.TOPIC + this.props.metadata.topic : ""} </h2>
                <h3 className="center-pane-header__text center-pane-header--state">{this.printState()}</h3>
              </header>
              <hr className="center-pane__line"/>
              <div className="timer-container">
                <h3 className="timer-container__header">{this.state.timerHeader}</h3>
                <div className="timer-container__timer-box">{this.getTimerState()}</div>
              </div>
            </div>
          </div>

          <RightPane
            side={this.state.side}
            speaker={this.state.speaker}
            hideCurrent={this.state.inShort}
            shortsAvailable={this.state.rightShorts}
            shortDuration={this.props.metadata.sduration}
            handleUseShort={this.handleUseRightShort}
            canUseShort={this.canUseShort}
            hasEnded={this.state.hasEnded}
          />
        </div>
        <div className="control-buttons-container">
        <button className="control-buttons-container__control-button control-buttons-container__reset-button" onClick={this.props.resetApp}>
          <FontAwesomeIcon icon={undo} />
        </button>
        <button
          className="control-buttons-container__control-button control-buttons-container__sound-button"
          id="sound-control-button"
          onClick={this.switchSound}
          tabIndex="-1"
        >
          {this.state.soundsEnabled ?
            <FontAwesomeIcon icon={soundsOn} />:
            <FontAwesomeIcon icon={soundsOff} />
          }

        </button>
        </div>

      </div>
    );
  }
}
