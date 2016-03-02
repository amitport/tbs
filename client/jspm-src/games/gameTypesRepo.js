import ticTacToe from './ticTacToe/master/index';
import fourInALine from './fourInALine/master/index';

const gameTypes = {
  ticTacToe,
  fourInALine
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
