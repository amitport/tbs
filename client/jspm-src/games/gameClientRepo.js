
import TicTacToeGameClient from './ticTacToe/client/index';
import FourInALineGameClient from './fourInALine/client/index';

export default class GameClientRepo {
  constructor(app) {
    this.gameClients = {
      TicTacToe: new TicTacToeGameClient(app),
      FourInALine: new FourInALineGameClient(app)
    };
  }
  get(gameTypeId) {
    if (!this.gameClients.hasOwnProperty(gameTypeId)) {
      throw `couldn't find game client for game type: ${gameTypeId}`;
    }

    return this.gameClients[gameTypeId];
  }
};



