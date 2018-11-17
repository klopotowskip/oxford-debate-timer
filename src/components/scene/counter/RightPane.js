import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as userInactive } from '@fortawesome/free-regular-svg-icons';
import { faUser as userActive } from '@fortawesome/free-solid-svg-icons';

import Side from '~/src/model/Side';

import { getCounterMessages } from '~/src/locale/locale-supplier';

const messages = getCounterMessages();

export default class RightPane extends React.Component {

  getShortButtonLabel = () => {
    let duration = this.props.shortDuration;
    let seconds = (duration % 600) / 10;
    let minutes = (duration - seconds * 10) / 600;
    return (minutes > 0) ?
      (seconds > 0) ?
        `${minutes}' ${seconds}"` :
        `${minutes}'` :
      `${seconds}"`;
  }

  render(){
    let users = [];
    let shorts = [];

    let speaker = this.props.speaker;
    let side = this.props.side;
    let hideCurrent = this.props.hideCurrent;
    let hasEnded = this.props.hasEnded;

    for(let i = 1; i <= 4; i++){
      let id = "user-right-" + i;
      if(i>speaker){
        users.push(<FontAwesomeIcon key={id} id={id} icon={userActive} className="user-icon user-icon--active" />);
      } else if(i<speaker){
        users.push(<FontAwesomeIcon key={id} id={id} icon={userInactive} className="user-icon user-icon--inactive" />);
      } else {
        if((side === Side.RIGHT) && (!hideCurrent) && (!hasEnded)){
          users.push(<FontAwesomeIcon key={id} id={id} icon={userActive} className="user-icon user-icon--current" />);
        } else if (hasEnded){
          users.push(<FontAwesomeIcon key={id} id={id} icon={userInactive} className="user-icon user-icon--inactive" />);
        } else {
          users.push(<FontAwesomeIcon key={id} id={id} icon={userActive} className="user-icon user-icon--active" />);
        }

      }

    }

    let shortLabel = this.getShortButtonLabel();
    const isShortDisabled = !(this.props.canUseShort(Side.RIGHT));

    for(let i = 0; i < this.props.shortsAvailable; i++){
      let id = `short-button-right-${i}`;
      shorts.push(
        <button
          key={id}
          id={id}
          className="short-button"
          onClick={this.props.handleUseShort}
          tabIndex="-1"
          disabled={isShortDisabled}>
          {shortLabel}
        </button>);
    }
    return (
      <div className="right-pane">
        <div className="team-name">{messages.RIGHT_SIDE_LABEL}</div>
        <div className="user-icons-box">
          {users.map((user) => {
            return user;
          })}
        </div>
        <div className="short-buttons-box">
          {shorts.map((shortButton) => {
            return shortButton;
          })}
        </div>
      </div>
    );
  }
}
