import React from 'react';

import SetupScene from './scene/setup/SetupScene';
import CounterScene from './scene/counter/CounterScene';

const SCENE_SETUP = 'setup';
const SCENE_COUNTER = 'counter';

export default class TimerApp extends React.Component {

  state = {
    scene: SCENE_SETUP
  }

  resetApp = () => {
    this.setState(() => ({
      scene: SCENE_SETUP
    }));
  }

  processSetupSettings = (topic, lduration, squantity, sduration) => {
    const metadata = {
      topic,
      lduration,
      squantity,
      sduration
    }
    this.setState(() => ({
      scene: SCENE_COUNTER,
      metadata
    }));
  }

  render(){
    return (
      <div>
        {
          (() => {
            switch(this.state.scene){
              case SCENE_SETUP:
                return (
                  <SetupScene
                    processSetupSettings={this.processSetupSettings}
                  />
                );
              case SCENE_COUNTER:
                return (
                  <CounterScene
                    metadata={this.state.metadata}
                    resetApp={this.resetApp}
                  />
                );
              default:
                return (
                  <SetupScene
                    processSetupSettings={this.processSetupSettings}
                  />
                );
            }
          })()
        }
      </div>
    );
  }
}
