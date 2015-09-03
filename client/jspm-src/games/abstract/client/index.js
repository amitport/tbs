export default class AbstractGameClient {
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
