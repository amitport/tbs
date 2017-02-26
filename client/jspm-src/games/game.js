module.exports = class Game {
  static initializeRoom(room, numOfPlayers) {
    room.game = {
      isInProgress: false,
      starterIdx: Math.floor(Math.random() * numOfPlayers)
    };

    room.statistics = {totalGames: 0, wins: new Array(numOfPlayers).fill(0), score: new Array(numOfPlayers).fill(0)};

    room.players = [{type: 'human'}];
    for (let i = 1; i < numOfPlayers; i++) {
      room.players.push({type: 'human', isOpen: true});
    }
  }

  static startGame({game, players}) {
    game.isInProgress = true;
    game.currentPlayerIdx = game.starterIdx;
    game.starterIdx = (game.starterIdx + 1) % players.length;

    game.totalMoves = 0;

    delete game.isEnded;
    delete game.outcome;
  }
}
