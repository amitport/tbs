
import TicTacToeGameClient from '../../games/ticTacToe/client/index';
import FourInALineGameClient from '../../games/fourInALine/client/index';

export default class GameClientRepo {
  constructor(app) {
    this.gameClients = {
      ticTacToe: new TicTacToeGameClient(app),
      fourInALine: new FourInALineGameClient(app)
    };
  }
  get(gameTypeId) {
    if (!this.gameClients.hasOwnProperty(gameTypeId)) {
      throw `couldn't find game client for game type: ${gameTypeId}`;
    }

    return this.gameClients[gameTypeId];
  }
};



