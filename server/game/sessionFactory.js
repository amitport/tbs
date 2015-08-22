
const gameTypes = {
  'ticTacToe': require('../../client/jspm-src/games/ticTacToe/rules/index'),
  'fourInALine': require('../../client/jspm-src/games/fourInALine/rules/index')
};

const SessionFactory = {
  create(gameTypeId, gameEndedCb) {
    if (!gameTypes.hasOwnProperty(gameTypeId)) {
      throw `gameTypeId('${gameTypeId}') not found`;
    }

    const GameType = gameTypes[gameTypeId];

    return new GameType(gameEndedCb)
  }
};

export default SessionFactory;
