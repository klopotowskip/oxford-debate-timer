
export default class Speech {

  constructor(type, side, speaker){
    this.type = type;
    this.side = side;
    if(speaker) this.speaker = speaker;
  }

  getSide = () => {
    return this.side;
  }

  getType = () => {
    return this.type;
  }

  getSpeaker = () => {
    return this.speaker;
  }
}
