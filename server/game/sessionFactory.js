
const gameTypes = {
  'ticTacToe': require('./types/ticTacToe'),
  'fourInALine': require('./types/fourInALine')
};

const SessionFactoy = {
  create(gameTypeId, gameEndedCb) {
    if (!gameTypes.hasOwnProperty(gameTypeId)) {
      throw `gameTypeId('${gameTypeId}') not found`;
    }

    const GameType = gameTypes[gameTypeId];

    return new GameType(gameEndedCb)
  }
};

export default SessionFactoy;
