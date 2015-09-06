import config from './config';


class AbstractGameClient {
  constructor(Master, templateUrl) {
    this.Master = Master;
    this.templateUrl = templateUrl;
  }

  createLocalSession(gameEndedCb) {
    const session = new this.Master((result) =>{
      this.onGameEnd(result, session);

      session.players[0].ready = false;

      gameEndedCb(result);
    }, true);

    session.players[0].ready = true;
    session.players[1].ready = true;

    session.players[0].color = config.playerColors[0];
    session.players[1].color = config.playerColors[1];

    session.templateUrl = this.templateUrl;

    return session;
  }

  onGameEnd() {}
}

export default AbstractGameClient;
