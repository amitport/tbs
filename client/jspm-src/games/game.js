export default class Game {
  static initializeRoom(room, numOfPlayers) {
    room.game = {
      board: ['yeah'],
      isInProgress: false
    };

    room.statistics = {totalGames: 0, wins: new Array(numOfPlayers).fill(0)};

    room.players = [{type: 'human'}];
    for (let i = 1; i < numOfPlayers; i++) {
      room.players.push({type: 'human', isOpen: true});
    }
  }

  static startGame({game, players}) {
    game.isInProgress = true;
    game.currentPlayerIdx = Math.floor(Math.random() * players.length);

    game.totalMoves = 0;

    delete game.isEnded;
    delete game.outcome;

    game.board = ['no...'];
  }
}
