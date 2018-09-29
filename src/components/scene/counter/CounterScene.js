import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as userActive } from '@fortawesome/free-regular-svg-icons';
import { faUser as userInactive } from '@fortawesome/free-solid-svg-icons';

import LeftPane from './LeftPane';
import RightPane from './RightPane';

const timeLeft = "Pozostało czasu:";
const timeUp = "Koniec czasu";

export default class CounterScene extends React.Component {

  state = {
    isleft: true,
    user: 1,
    counter :{

    }
  }

  updateLeftUserPane = () => {

  }

  updateRightUserPane = () => {

  }

  render(){

    return (
      <div className="main-container">
        <div className="left-pane">
          <LeftPane
            isLeft={this.state.isLeft}
            user={this.state.user}
            updateLeftUserPane = {this.updateLeftUserPane}
          />
        </div>
        <div className="right-pane">
          <RightPane
            isLeft={this.state.isLeft}
            user={this.state.user}
            updateRightUserPane = {this.updateRightUserPane}
          />
        </div>
      </div>
    );
  }
}
