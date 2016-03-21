import BasicAi from './ai/basic';

export const name = 'TicTacToe';
export const color = 'beige';

export const ai = {basic: BasicAi};

function emptyBoard() {
  return [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']];
}

import M from 'master-class';

export const Game = M({
  $rootPropertyName: 'game',
  board: M.Array({
    defaultLength: 3,
    elem: M.Array({
      defaultLength: 3,
      elem: M('_')
    })
  }),
  isInProgress: false,
  currentPlayerIdx: NaN,
  totalMoves: 0,
  isEnded: false,
  outcome: {
    winner: Number,
    line: String
  },
  players: M.Array({
    defaultLength: 2,
    elem: M({
      get idx() {
        return this.keyPath[this.keyPath.length - 1];
      },
      get mark() {
        return ['X', 'O'][this.idx];
      },
      get name() {
        return 'player ' + this.idx;
      },
      get color() {
        return ['rgb(102,127,203)',
          'rgb(234, 123, 123)'][this.idx];
      },
      get next() {
        return this.parent[(this.idx + 1) % this.parent.length];
      },
      markCell({x, y}, statistics) {
        const game = this.game;

        game.board[x][y] = this.mark;
        game.totalMoves++;

        const outcome = game.searchForOutcome;

        if (outcome) {
          game.end(outcome, statistics)
        } else {
          game.currentPlayerIdx = (game.currentPlayerIdx + 1) % 2;

          game.currentPlayer = game.currentPlayer.next;
        }

      }
    })
  }),
  currentPlayer: M.Ref(),
  start() {
    this.isInProgress = true;
    this.currentPlayerIdx = Math.floor(Math.random() + 0.5);
    this.currentPlayer = this.players[this.currentPlayerIdx];

    this.totalMoves = 0;

    this.isEnded = false;
    this.board = emptyBoard();
  },
  end(outcome, statistics) {
    this.isInProgress = false;
    this.isEnded = true;
    this.outcome = outcome;

    statistics.totalGames++;
    if (outcome.hasOwnProperty('winner')) {
      statistics.wins[outcome.winner]++;
    }
  },
  get searchForOutcome() {
    const {board, totalMoves, currentPlayerIdx} = this;

    for (let i0 = 0; i0 < 3; i0++) {
      const i1 = (i0 + 1) % 3;
      const i2 = (i0 + 2) % 3;

      const c0 = board[i0][i0];
      if (c0 !== '_') {
        if (c0 === board[i0][i1] && c0 === board[i0][i2]) {
          return {winner: currentPlayerIdx, line: 'r' + i0};
        }
        if (c0 === board[i1][i0] && c0 === board[i2][i0]) {
          return {winner: currentPlayerIdx, line: 'c' + i0};
        }
      }
    }

    const c0 = board[1][1];
    if (c0 !== '_') {
      if (c0 === board[0][0] && c0 === board[2][2]) {
        return {winner: currentPlayerIdx, line: 'd0'};
      }
      if (c0 === board[2][0] && c0 === board[0][2]) {
        return {winner: currentPlayerIdx, line: 'd1'};
      }
    }

    if (totalMoves === 9) {
      return 'tie';
    }
  }
});

export function initializeRoom(room) {
  room.game = Game.createInstance();

  room.statistics = {totalGames: 0, wins: [0, 0]};

  room.players = [{}, {}];
}

export function startGame({game}) {
  game.start();
}

export const actions = {
  markCell: function ({game, action, statistics}) {
    game.currentPlayer.markCell(action.payload, statistics);
  }
};

export default {
  Game,
  name,
  color,
  ai,
  initializeRoom,
  startGame,
  actions
};
