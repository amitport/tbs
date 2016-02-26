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
      members: [
        {ready: this.members[0].ready, username: this.members[0].username},
        {ready: this.members[1].ready, username: this.members[1].username}],

      session: this.hasOwnProperty('session') ? this.session.serialize() : null
    };
  }
}
