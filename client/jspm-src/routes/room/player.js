
const Colors = ['rgb(100, 100, 193)', 'rgb(234, 123, 123)'];


class Player {
  constructor(raw, idx) {
    this.ready = raw.ready;
    this.idx = idx;
    this.color = Colors[idx];
  }
  static deserializeAll(rawPlayers, ownIdx) {
    const players = [new Player(rawPlayers[0], 0), new Player(rawPlayers[1], 1)];

    players.own = players[ownIdx];
    players.opp = players[(ownIdx + 1) % 2];

    return players;
  }
}

export default Player;
