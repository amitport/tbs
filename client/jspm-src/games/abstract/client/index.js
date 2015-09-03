class AbstractGameClient {
  constructor(Master) {
    this.Master = Master;
  }

  createLocalSession(gameEndedCb, ai) {
    const session = new this.Master((result) =>{
      this.onGameEnd(result, session);

      gameEndedCb(result);
    }, ai);
    return session;
  }

  onGameEnd() {}
}

AbstractGameClient.playerColors = ['rgb(100, 100, 193)', 'rgb(234, 123, 123)'];

export default AbstractGameClient;
