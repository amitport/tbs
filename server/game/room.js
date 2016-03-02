export default class Room {
  constructor(opt) {
    this.gameId = opt.gameId;
    this.members = opt.members;
    this.stat = [0, 0];
  }

  serialize() {
    return {
      stat: this.stat,
      gameId: this.gameId,
      members: this.members.map((member) => {return {
        ready: member.ready, username: member.username, type: member.type};
      }),
      session: this.hasOwnProperty('session') ? this.session.serialize() : null
    };
  }
}
