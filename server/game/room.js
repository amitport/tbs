export default class Room {
  constructor(opt) {
    this.status = opt.status;
    this.gameId = opt.gameId;
    this.members = opt.members;
    this.stat = [0, 0];
  }

  serialize() {
    return {
      status: this.status,
      stat: this.stat,
      gameId: this.gameId,
      members: [{ready: this.members[0].ready}, {ready: this.members[1].ready}],

      session: this.hasOwnProperty('session') ? this.session.serialize() : null
    };
  }
}
