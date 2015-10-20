export default class Session {
  constructor(players, gameEndedCb) {
    this.players = players;
    this.gameEndedCb = gameEndedCb;

    // only support 2 player cyclic turn strategy for now
    // TODO generify this
    this.players[0].next = this.players[1];
    this.players[1].next = this.players[0];

    this.initialize();
  }

  // abstract serialize()

  recycle() {
    delete this.result;
    this.initialize();
  }

  isEnded() {
    console.log('this.has ' + this.hasOwnProperty('result'));
    console.log('\tresult ' + this.result);
    return this.hasOwnProperty('result');
  }
};