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

  broadcastUpdate() {
    const serializedRoom = this.serialize();
    this.members[0].socket.emit('room:update', serializedRoom);
    if (this.members[1].hasOwnProperty('socket')) {
      this.members[1].socket.emit('room:update', serializedRoom);
    }
  }

  static rooms = [];

  static create({gameId, creator}) {
    return this.rooms.push(new Room({
        gameId: gameId,
        members: [{socket: creator.socket, username: creator.username, ready: false}, {ready: false}]
      })) - 1;
  }
  static get(id) {
    if (!this.rooms.hasOwnProperty(id)) {
      throw 'room not found';
    }

    return this.rooms[id];
  }
}
