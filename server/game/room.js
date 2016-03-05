import gameTypesRepo from '../../client/jspm-src/games/gameTypesRepo';

export default class Room {
  constructor(opt) {
    this.gameType = gameTypesRepo.get(opt.gameTypeId);
    this.members = opt.members;
    this.stat = [0, 0];
  }

  serialize() {
    return {
      stat: this.stat,
      gameTypeId: this.gameType.name,
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

  static create({gameTypeId, creator}) {
    return this.rooms.push(new Room({
        gameTypeId: gameTypeId,
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
