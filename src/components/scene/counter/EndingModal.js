import React from 'react';
import Modal from 'react-modal';

export default class EndingModal extends React.Component {
  constructor(props){
    super(props);

  }

  afterModalOpen = () => {

  };

  render(){
    let times = [];

    for(let i=0; i<this.props.speechEndTimes.length; i++){
      let e = this.props.speechEndTimes[i];
      let key = `time-${i}`;
      times.push(
        <div
          key={key}
        >
          {e.speaker} {e.side}: {e.time}
        </div>
      )
    }
    return (
      <Modal
        isOpen={true}
        onAfterOpen={this.afterModalOpen}
        onRequestClose={this.props.closeModal}
        contentLabel="Hello world"
        ariaHideApp={false}
      >
        {times.map((e) => {
          return e;
        })}
      </Modal>
    );
  }
}
