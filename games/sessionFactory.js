import ticTacToe from './ticTacToe/rules/index';

const gameTypes = {
  ticTacToe
};

const SessionFactory = {
  create(gameTypeId, gameEndedCb) {
    if (!gameTypes.hasOwnProperty(gameTypeId)) {
      throw `gameTypeId('${gameTypeId}') not found`;
    }

    const GameType = gameTypes[gameTypeId];

    return new GameType(gameEndedCb, true)
  }
};

export default SessionFactory;
