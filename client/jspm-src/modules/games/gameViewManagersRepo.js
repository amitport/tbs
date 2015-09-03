import ticTacToe from '../../games/ticTacToe/client/manager';

const GameViewManagers = {
  ticTacToe
};

const GameViewManagersRepo = {
  get(gameTypeId) {
    if (!GameViewManagers.hasOwnProperty(gameTypeId)) {
      throw `gameTypeId('${gameTypeId}') not found`;
    }

    return GameViewManagers[gameTypeId];
  }
};

export default GameViewManagersRepo;
