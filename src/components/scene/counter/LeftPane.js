import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as userInactive } from '@fortawesome/free-regular-svg-icons';
import { faUser as userActive } from '@fortawesome/free-solid-svg-icons';

import Side from '~/src/model/Side';

export default class LeftPane extends React.Component {

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

  render() {
    let users = [];
    let shorts = [];

    let speaker = this.props.speaker;
    let side = this.props.side;
    let hideCurrent = this.props.hideCurrent;

    for(let i = 1; i <= 4; i++){
      let id = `user-left-${i}`;
      if(i>speaker){
        users.push(<FontAwesomeIcon key={id} id={id} icon={userActive} className="user-icon user-icon--active" />);
      } else if(i<speaker){
        users.push(<FontAwesomeIcon key={id} id={id} icon={userInactive} className="user-icon user-icon--inactive" />);
      } else {
        if((side === Side.LEFT) && (!hideCurrent)){
          users.push(<FontAwesomeIcon key={id} id={id} icon={userActive} className="user-icon user-icon--current" />);
        } else {
          users.push(<FontAwesomeIcon key={id} id={id} icon={userInactive} className="user-icon user-icon--inactive" />);
        }

      }

    }

    let shortLabel = this.getShortButtonLabel();
    const isShortDisabled = !(this.props.canUseShort(Side.LEFT));

    for(let i = 0; i < this.props.shortsAvailable; i++){
      let id = `short-button-left-${i}`;
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
      <div>
        <div>
          {users.map((user) => {
            return user;
          })}
        </div>
        <div>
          {shorts.map((shortButton) => {
            return shortButton;
          })}
        </div>
      </div>
    );
  }
}
