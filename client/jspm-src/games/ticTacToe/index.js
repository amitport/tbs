import BasicAi from './ai/basic';

export const name = 'TicTacToe';
export const color = 'beige';

export const ai = {basic: BasicAi};

function emptyBoard() {
  return [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']];
}

import M from 'master-class';

var Game = M({
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
  start() {
    this.isInProgress = true;
    this.currentPlayerIdx = Math.floor(Math.random() + 0.5);
    this.totalMoves = 0;

    this.isEnded = false;
    this.board = emptyBoard();
  },
  end(outcome) {
    this.isInProgress = false;
    this.isEnded = true;
    this.outcome = outcome;
  }
});

export function initializeRoom(room) {
  room.game = Game.createInstance();

  room.statistics = {totalGames: 0, wins: [0, 0]};

  room.players = [{mark: 'X'}, {mark: 'O'}];
}

export function startGame({game}) {
  game.start();
}

function searchForOutcome({board, totalMoves, currentPlayerIdx}) {
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

function end({statistics, game, outcome}) {
  game.end(outcome);

  statistics.totalGames++;
  if (outcome.hasOwnProperty('winner')) {
    statistics.wins[outcome.winner]++;
  }
}

export const actions = {
  markCell: function ({statistics, game, players, action}) {
    const {x, y} = action.payload;
    game.board[x][y] = players[game.currentPlayerIdx].mark;
    game.totalMoves++;

    const outcome = searchForOutcome(game);

    if (outcome) {
      end({statistics, game, outcome})
    } else {
      game.currentPlayerIdx = (game.currentPlayerIdx + 1) % 2;
    }
  }
};

export default {
  name,
  color,
  ai,
  initializeRoom,
  startGame,
  actions
};
