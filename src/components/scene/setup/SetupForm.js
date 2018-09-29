import React from 'react';

export default class SetupForm extends React.Component {

  processSetupSettings = (e) => {
    e.preventDefault();
    this.props.processSetupSettings();
  }
  render(){
    return (
      <div>
        <form className="setup-form" onSubmit={this.processSetupSettings}>
          <span className="setup-form__input-name">Topic:</span>
          <input autoFocus type="text" name="topic" className="setup-form__topic-input" required/>
          <div className="lduration-radio">
            <span className="lduration-radio__title">lduration</span>
            <div>
              <input type="radio" id="lduration-3min" name="lduration" value="180"/>
              <label htmlFor="lduration-3min">3 min</label>
            </div>
            <div>
              <input type="radio" id="lduration-4min" name="lduration" value="240" defaultChecked/>
              <label htmlFor="lduration-4min">4 min</label>
            </div>
            <div>
              <input type="radio" id="lduration-5min" name="lduration" value="300"/>
              <label htmlFor="lduration-5min">5 min</label>
            </div>
          </div>

          <div className="squantity-radio">
            <span className="squantity-radio__title">squantity</span>
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
            <span className="sduration-radio__title">sduration</span>
            <div>
              <input type="radio" id="sduration-30s" name="sduration" value="30"/>
              <label htmlFor="sduration-30s">30 s</label>
            </div>
            <div>
              <input type="radio" id="sduration-1min" name="sduration" value="60" defaultChecked/>
              <label htmlFor="sduration-1min">1 min</label>
            </div>
            <div>
              <input type="radio" id="sduration-2min" name="sduration" value="120"/>
              <label htmlFor="sduration-2min">2 min</label>
            </div>

            <button type="submit" className="setup-form__submit">Start</button>
          </div>
        </form>
      </div>
    );
  }
}
