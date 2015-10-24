import Player from './player';

export default class Room {
  constructor(raw, ownIdx, gameType, skipDeserialization) {//gameTypeId, ownIdx, id, io, scope, gameClientRepo) {
    this.gameType = gameType;//gameClientRepo.get(gameTypeId).applyGameType(id, io, scope);
    this.skipDeserialization = skipDeserialization;

    this.players = (this.skipDeserialization) ? raw.players : Player.deserializeAll(raw.players, ownIdx);
    this.update(raw);
  }

  update(raw) {
    this.status = raw.status;
    this.stat = raw.stat;
    if (raw.session != null) {
      this.session = (this.skipDeserialization) ? raw.session : this.gameType.deserializeSession(raw.session, this.players);
    }

    this.players[0].ready = raw.players[0].ready;
    this.players[1].ready = raw.players[1].ready;
  }
}
