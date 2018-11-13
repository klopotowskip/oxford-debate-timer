import React from 'react';

import SetupForm from './SetupForm';

export default class SetupScene extends React.Component {

  render(){

    return (
      <div className="setup-box">
        <SetupForm processSetupSettings={this.props.processSetupSettings} />
      </div>
    );
  }
}
