import BasicAi from './ai/basic';

export const id = 'TicTacToe';

export const ai = {basic: BasicAi};

function emptyBoard() {return [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']]};

export function initializeRoom(room) {
  room.game = {
    board: emptyBoard(),
    isInProgress: false
  };
  room.statistics = {totalGames: 0, wins: [0, 0]};

  room.players = [{mark: 'X'}, {mark: 'O'}];
}

export function startGame({game}) {
  game.isInProgress = true;
  game.currentPlayerIdx = Math.floor(Math.random() + 0.5);
  game.totalMoves = 0;

  delete game.isEnded;
  delete game.outcome;

  game.board = emptyBoard();
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
  game.isInProgress = false;
  game.isEnded = true;
  game.outcome = outcome;

  statistics.totalGames++;
  if (outcome.hasOwnProperty('winner')) {
    statistics.wins[outcome.winner]++;
  }
}

export function deserialize(room) {
  if (room.game.isEnded && room.game.outcome !== 'tie') {
    room.game.outcome.line =
      {
        'c0': {c1: 0, r1: 0, c2: 0, r2: 2},
        'c1': {c1: 1, r1: 0, c2: 1, r2: 2},
        'c2': {c1: 2, r1: 0, c2: 2, r2: 2},
        'r0': {c1: 0, r1: 0, c2: 2, r2: 0},
        'r1': {c1: 0, r1: 1, c2: 2, r2: 1},
        'r2': {c1: 0, r1: 2, c2: 2, r2: 2},
        'd0': {c1: 0, r1: 0, c2: 2, r2: 2},
        'd1': {c1: 0, r1: 2, c2: 2, r2: 0}
      }[room.game.outcome.line];
  }
  room.game.markCell = (payload) => {
    room.io.emit('room:gameAction', {roomId: room.roomId, type: 'MARK_CELL', payload});
  };
}

export const actions = {
  'MARK_CELL': function({statistics, game, players, action}) {
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
  id,
  ai,
  initializeRoom,
  startGame,
  deserialize,
  actions
};
