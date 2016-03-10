export default class Game {
  static initializeRoom(room) {
    room.game = {
      board: ['yeah'],
      isInProgress: false
    };
    room.statistics = {totalGames: 0, wins: [0, 0]};

    room.players = [{mark: 'b'}, {mark: 'r', type: 'human', isOpen: true}];
  }

  static startGame({game}) {
    game.isInProgress = true;
    game.currentPlayerIdx = Math.floor(Math.random() + 0.5);
    game.totalMoves = 0;

    delete game.isEnded;
    delete game.outcome;

    game.board = ['no...'];
  }
}
