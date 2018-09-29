import React from 'react';

import LeftPane from './LeftPane';
import RightPane from './RightPane';

const timeLeft = "Pozostało czasu:";
const timeUp = "Koniec czasu";

export default class CounterScene extends React.Component {

  state = {
    isLeft: false,
    currentUser: 3
  }
  /*componentDidMount(){
    this.setState((state) => ({
      isleft: true,
      currentUser: 1
    }));
    console.log('done');
  }*/

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
            currentUser={this.state.currentUser}
            updateLeftUserPane = {this.updateLeftUserPane}
          />
        </div>
        <div className="right-pane">
          <RightPane
            isLeft={this.state.isLeft}
            currentUser={this.state.currentUser}
            updateRightUserPane = {this.updateRightUserPane}
          />
        </div>
      </div>
    );
  }
}
