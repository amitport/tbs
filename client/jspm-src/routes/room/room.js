import gameTypes from '../../modules/games/types';
import Player from './player';

export default class Room {
  constructor(raw, gameTypeId, ownIdx, id, io) {
    this.gameType = gameTypes[gameTypeId](id, io);

    this.players = Player.deserializeAll(raw.players, ownIdx);

    this.update(raw);
  }

  update(raw) {
    this.status = raw.status;
    this.stat = raw.stat;
    if (raw.session != null) {
      this.session = this.gameType.deserializeSession(raw.session, this.players);
    }

    this.players[0].ready = raw.players[0].ready;
    this.players[1].ready = raw.players[1].ready;
  }
}