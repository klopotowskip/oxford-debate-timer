import React from 'react';

//import { setupMessages as messages } from '~/src/components/messages/pl/setup-messages';

import { getSetupMessages } from '~/src/locale/locale-supplier';

const messages = getSetupMessages();

export default class SetupForm extends React.Component {
  state = {
    squantity: 2
  }


  changeSquantity = (value) => {
    this.setState(() => ({ squantity: value }));
  }

  handleChange = (event) => {
    //event.persist();
    console.log(event.target.value);
    //const showShortDuration = event.targe
    //this.setState(() => ({showShortDuration: event.target.checked}));
  }

  processSetupSettings = (e) => {
    e.preventDefault();

    const topic = e.target.elements.topic.value.trim();
    const lduration = e.target.elements.lduration.value;
    const squantity = e.target.elements.squantity.value;
    const sduration = (e.target.elements.sduration) ?
      e.target.elements.sduration.value: 0;

    this.props.processSetupSettings(topic, lduration, squantity, sduration);
  }
  render(){
    return (
      <div>
        <img src="/images/logo.png" className="setup-form-logo"/>
        <form className="setup-form" onSubmit={this.processSetupSettings}>
          <span className="setup-form__input-name">{messages.TOPIC}</span>
          <input autoFocus type="text" name="topic" className="setup-form__topic-input" />
          <div className="setup-form__radio-group lduration-radio">
            <span className="setup-form__radio-title">{messages.LONG_SPEECH_DURATION}</span>
            <div className="setup-form__radio-option-box">
              <input className="setup-form__radio-button" type="radio" id="lduration-3min" name="lduration" value="1800" />
              <label className="setup-form__radio-button-label" htmlFor="lduration-3min">3 min</label>
            </div>
            <div className="setup-form__radio-option-box">
              <input className="setup-form__radio-button" type="radio" id="lduration-4min" name="lduration" value="2400" defaultChecked />
              <label className="setup-form__radio-button-label" htmlFor="lduration-4min">4 min</label>
            </div>
            <div className="setup-form__radio-option-box">
              <input className="setup-form__radio-button" type="radio" id="lduration-5min" name="lduration" value="3000"/>
              <label className="setup-form__radio-button-label" htmlFor="lduration-5min">5 min</label>
            </div>
          </div>

          <div className="setup-form__radio-group squantity-radio">
            <span className="setup-form__radio-title">{messages.SHORT_SPEECH_QUANTITY}</span>
            <div className="setup-form__radio-option-box">
              <input className="setup-form__radio-button" type="radio" id="squantity-0" name="squantity" value="0" onChange={(e) => this.changeSquantity(0)} />
              <label className="setup-form__radio-button-label" htmlFor="squantity-0" >0</label>
            </div>
            <div className="setup-form__radio-option-box">
              <input className="setup-form__radio-button" type="radio" id="squantity-1" name="squantity" value="1" onChange={(e) => this.changeSquantity(1)} />
              <label className="setup-form__radio-button-label" htmlFor="squantity-1">1</label>
            </div>
            <div className="setup-form__radio-option-box">
              <input className="setup-form__radio-button" type="radio" id="squantity-2" name="squantity" value="2" onChange={(e) => this.changeSquantity(2)} defaultChecked />
              <label className="setup-form__radio-button-label" htmlFor="squantity-2">2</label>
            </div>
            <div className="setup-form__radio-option-box">
              <input className="setup-form__radio-button" type="radio" id="squantity-3" name="squantity" value="3" onChange={(e) => this.changeSquantity(3)} />
              <label className="setup-form__radio-button-label" htmlFor="squantity-3">3</label>
            </div>
          </div>
          {(this.state.squantity > 0) ?
            <div className="setup-form__radio-group sduration-radio">
              <span className="setup-form__radio-title">{messages.SHORT_SPEECH_DURATION}</span>
              <div className="setup-form__radio-option-box">
                <input className="setup-form__radio-button" type="radio" id="sduration-30s" name="sduration" value="300" defaultChecked />
                <label className="setup-form__radio-button-label" htmlFor="sduration-30s">30 s</label>
              </div>
              <div className="setup-form__radio-option-box">
                <input className="setup-form__radio-button" type="radio" id="sduration-1min" name="sduration" value="600" />
                <label className="setup-form__radio-button-label" htmlFor="sduration-1min">1 min</label>
              </div>
              <div className="setup-form__radio-option-box">
                <input className="setup-form__radio-button" type="radio" id="sduration-2min" name="sduration" value="1200" />
                <label className="setup-form__radio-button-label" htmlFor="sduration-2min">2 min</label>
              </div>
            </div> : ""
          }

          <button type="submit" className="setup-form__submit">{messages.START_BUTTON}</button>
        </form>
      </div>
    );
  }
}
