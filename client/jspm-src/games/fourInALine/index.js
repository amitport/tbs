const name = 'FourInALine';
const color = '#408080';

function emptyBoard() {
  return [
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_']
  ];
}

function initializeRoom(room) {
  room.game = {
    board: emptyBoard(),
    isInProgress: false
  };
  room.statistics = {totalGames: 0, wins: [0, 0]};

  room.players = [{mark: 'b'}, {mark: 'r', type: 'human', isOpen: true}];
}

function startGame({game}) {
  game.isInProgress = true;
  game.currentPlayerIdx = Math.floor(Math.random() + 0.5);
  game.totalMoves = 0;

  delete game.isEnded;
  delete game.outcome;

  game.board = emptyBoard();
}

function searchForOutcome({currentPlayerIdx, board, totalMoves}, {r, c}) {
  let count = 1, color = board[r][c];

  let cLeft, cRight, rBottom, rTop;
  // horizontal
  for (cLeft = c - 1; cLeft >= 0 && color === board[r][cLeft]; cLeft--, count++);
  for (cRight = c + 1; cRight < 7 && color === board[r][cRight]; cRight++, count++);

  if (count >= 4) {
    return {winner: currentPlayerIdx, line: {c1: cLeft + 1, r1: r, c2: cRight - 1, r2: r}, color};
  } else {
    count = 1;
    // vertical
    for (rBottom = r + 1; rBottom < 6 && color === board[rBottom][c]; rBottom++, count++);
    if (count >= 4) {
      return {winner: currentPlayerIdx, line: {c1: c, r1: r, c2: c, r2: rBottom - 1}, color};
    } else {
      count = 1;

      // diagonal left-top
      for (rBottom = r + 1, cLeft = c - 1; rBottom < 6 && cLeft >= 0 && color === board[rBottom][cLeft]; rBottom++, cLeft--, count++);
      for (rTop = r - 1, cRight = c + 1; rTop >= 0 && cRight < 7 && color === board[rTop][cRight]; rTop--, cRight++, count++);

      if (count >= 4) {
        return {winner: currentPlayerIdx, line: {c1: cLeft + 1, r1: rBottom - 1, c2: cRight - 1, r2: rTop + 1}, color};
      } else {
        count = 1;

        // diagonal left-bottom
        for (rTop = r - 1, cLeft = c - 1; rTop >= 0 && cLeft >= 0 && color === board[rTop][cLeft]; rTop--, cLeft--, count++);
        for (rBottom = r + 1, cRight = c + 1; rBottom < 6 && cRight < 7 && color === board[rBottom][cRight]; rBottom++, cRight++, count++);

        if (count >= 4) {
          return {
            winner: currentPlayerIdx,
            line: {c1: cLeft + 1, r1: rTop + 1, c2: cRight - 1, r2: rBottom - 1},
            color
          };
        }
      }
    }
  }

  if (totalMoves === 42) {
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

const actions = {
  markCol: function ({statistics, game, players, action}) {
    const {c} = action.payload;
    for (var r = 5; r >= 0; r--) {
      if (game.board[r][c] === '_') {
        game.board[r][c] = players[game.currentPlayerIdx].mark;
        game.totalMoves++;

        const outcome = searchForOutcome(game, {r, c});

        if (outcome) {
          end({statistics, game, outcome});
        } else {
          game.currentPlayerIdx = (game.currentPlayerIdx + 1) % 2;

        }
        break;
      }
    }
  }
};

module.exports = {
  name,
  color,
  initializeRoom,
  startGame,
  actions
}
