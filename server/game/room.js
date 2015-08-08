export default class Room {
  constructor(opt) {
    this.status = opt.status;
    this.gameId = opt.gameId;
    this.players = opt.players;
    this.stat = [0, 0];
  }

  serialize() {
    return {
      status: this.status,
      stat: this.stat,
      gameId: this.gameId,
      players: [{ready: this.players[0].ready}, {ready: this.players[1].ready}],

      session: this.hasOwnProperty('session') ? this.session.serialize() : null
    };
  }
}
