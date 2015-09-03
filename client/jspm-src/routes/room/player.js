
import AbstractGameClient from '../../games/abstract/client/index';

class Player {
  constructor(raw, idx) {
    this.ready = raw.ready;
    this.idx = idx;
    this.color = AbstractGameClient.playerColors[idx];
  }
  static deserializeAll(rawPlayers, ownIdx) {
    const players = [new Player(rawPlayers[0], 0), new Player(rawPlayers[1], 1)];

    players.own = players[ownIdx];
    players.opp = players[(ownIdx + 1) % 2];

    return players;
  }
}

export default Player;
