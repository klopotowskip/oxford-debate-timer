
export default class Speech {

  constructor(type, speaker, side){
    this.type = type;
    if(speaker) this.speaker = speaker;
    if(side) this.side = side;
  }

  getSide = () => {
    return side;
  }

  getType = () => {
    return type;
  }

  getSpeaker = () => {
    return speaker;
  }
}
