
export default class Room {
  constructor(raw, ownIdx, session, gameClient, skipDeserialization, ready) {
    this.session = session;
    this.gameClient = gameClient;
    this.skipDeserialization = skipDeserialization;
    this.ready = ready;

    this.players = (this.skipDeserialization) ? raw.players : this.session.players;
    this.players.own = this.players[ownIdx];
    this.players.opp = this.players[(ownIdx + 1) % 2];

    this.update(raw);
  }

  update(raw) {
    this.status = raw.status;
    this.stat = raw.stat;
    if (raw.session != null) {
      if (this.skipDeserialization) {
        this.session = raw.session;
      } else {
        this.gameClient.updateSessionState(this.session, raw.session);
      }
    }

    this.players[0].ready = raw.players[0].ready;
    this.players[1].ready = raw.players[1].ready;
  }
}
