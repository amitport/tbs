
export default class Room {
  constructor(raw, ownIdx, gameClient, io, roomId) {
    this.session = gameClient.createSessionProxy({}, ownIdx, roomId, io);
    this.gameClient = gameClient;
    this.io = io;
    this.roomId = roomId;

    this.members = raw.members;
    this.members.own = this.members[ownIdx];
    this.members.opp = this.members[(ownIdx + 1) % 2];

    this.update(raw);
  }

  update(raw) {
    this.status = raw.status;
    this.stat = raw.stat;
    this.members[0].ready = raw.members[0].ready;
    this.members[1].ready = raw.members[1].ready;

    if (raw.session) this.gameClient.updateSessionState(this.session, raw.session);
  }

  ready() {
    this.io.emit('room:ready', this.roomId);
  }
}
