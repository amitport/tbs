import TicTacToe from './ticTacToe/master/index';
import FourInALine from './fourInALine/master/index';

const gameTypes = {
  TicTacToe,
  FourInALine
};

const gameTypesRepo = {
  get(gameTypeId) {
    if (!gameTypes.hasOwnProperty(gameTypeId)) {
      throw Error(`gameTypeId('${gameTypeId}') not found`);
    }

    return gameTypes[gameTypeId];
  }
};

export default gameTypesRepo;
