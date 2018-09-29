import React from 'react';

import SetupForm from './SetupForm';

export default class SetupScene extends React.Component {

  render(){

    return (
      <div className="setup-box">
        <h1 className="setup-box__app-header">TimerApp Setup</h1>
        <SetupForm processSetupSettings={this.props.processSetupSettings} />
      </div>
    );
  }
}
