import ticTacToe from './ticTacToe/rules/index';
import fourInALine from './fourInALine/rules/index';

const gameTypes = {
  ticTacToe,
  fourInALine
};

const SessionFactory = {
  create(gameTypeId, gameEndedCb, ai) {
    if (!gameTypes.hasOwnProperty(gameTypeId)) {
      throw `gameTypeId('${gameTypeId}') not found`;
    }

    const GameType = gameTypes[gameTypeId];

    return new GameType(gameEndedCb, ai)
  }
};

export default SessionFactory;
