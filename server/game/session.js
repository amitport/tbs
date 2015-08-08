export default class Session {
  constructor(players, gameEndedCb) {
    this.players = players;
    this.players[0].next = this.players[1];
    this.players[1].next = this.players[0];
    this.gameEndedCb = gameEndedCb;

    this.init();
  }

  // abstract serialize()
};
