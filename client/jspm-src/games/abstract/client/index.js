import config from './config';


class AbstractGameClient {
  constructor(Master) {
    this.Master = Master;
  }

  createLocalSession(gameEndedCb) {
    const session = new this.Master((result) =>{
      this.onGameEnd(result, session);

      gameEndedCb(result);
    }, true);

    session.players[0].color = config.playerColors[0];
    session.players[1].color = config.playerColors[1];

    //session.players = Player.deserializePlayers(session.players, 0);
    //session.players[0].next = session.players[1];
    //session.players[1].next = session.players[0];
    //session.currentPlayer = session.players[session.currentPlayer.idx];

    return session;
  }

  onGameEnd() {}
}

export default AbstractGameClient;
