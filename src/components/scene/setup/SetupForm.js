import React from 'react';

//import { setupMessages as messages } from '~/src/components/messages/pl/setup-messages';

import { getSetupMessages } from '~/src/locale/locale-supplier';

const messages = getSetupMessages(); 

export default class SetupForm extends React.Component {

  processSetupSettings = (e) => {
    e.preventDefault();

    const topic = e.target.elements.topic.value.trim();
    const lduration = e.target.elements.lduration.value;
    const squantity = e.target.elements.squantity.value;
    const sduration = e.target.elements.sduration.value;


    this.props.processSetupSettings(topic, lduration, squantity, sduration);
  }
  render(){
    return (
      <div>
        <form className="setup-form" onSubmit={this.processSetupSettings}>
          <span className="setup-form__input-name">{messages.TOPIC}</span>
          <input autoFocus type="text" name="topic" className="setup-form__topic-input" required defaultValue="test"/>
          <div className="lduration-radio">
            <span className="lduration-radio__title">{messages.LONG_SPEECH_DURATION}</span>
            <div>
              <input type="radio" id="lduration-debug" name="lduration" value="50" defaultChecked/>
              <label htmlFor="lduration-debug">2 min</label>
            </div>
            <div>
              <input type="radio" id="lduration-3min" name="lduration" value="1800"/>
              <label htmlFor="lduration-3min">3 min</label>
            </div>
            <div>
              <input type="radio" id="lduration-4min" name="lduration" value="2400"/>
              <label htmlFor="lduration-4min">4 min</label>
            </div>
            <div>
              <input type="radio" id="lduration-5min" name="lduration" value="3000"/>
              <label htmlFor="lduration-5min">5 min</label>
            </div>
          </div>

          <div className="squantity-radio">
            <span className="squantity-radio__title">{messages.SHORT_SPEECH_QUANTITY}</span>
            <div>
              <input type="radio" id="squantity-0" name="squantity" value="0"/>
              <label htmlFor="squantity-0">0</label>
            </div>
            <div>
              <input type="radio" id="squantity-1" name="squantity" value="1"/>
              <label htmlFor="squantity-1">1</label>
            </div>
            <div>
              <input type="radio" id="squantity-2" name="squantity" value="2" defaultChecked/>
              <label htmlFor="squantity-2">2</label>
            </div>
          </div>
          <div className="sduration-radio">
            <span className="sduration-radio__title">{messages.SHORT_SPEECH_DURATION}</span>
            <div>
              <input type="radio" id="sduration-debug" name="sduration" value="30" defaultChecked/>
              <label htmlFor="sduration-3s">DEBUG</label>
            </div>
            <div>
              <input type="radio" id="sduration-30s" name="sduration" value="300"/>
              <label htmlFor="sduration-30s">30 s</label>
            </div>
            <div>
              <input type="radio" id="sduration-1min" name="sduration" value="600"/>
              <label htmlFor="sduration-1min">1 min</label>
            </div>
            <div>
              <input type="radio" id="sduration-2min" name="sduration" value="1200"/>
              <label htmlFor="sduration-2min">2 min</label>
            </div>

            <button type="submit" className="setup-form__submit">{messages.START_BUTTON}</button>
          </div>
        </form>
      </div>
    );
  }
}
