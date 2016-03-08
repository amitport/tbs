import {calcScores} from './strategy';

function scoreComparator(a, b) {
  for (let priority = 0; priority < 4; priority++) {
    if (b.score[priority] != a.score[priority]) {
      return b.score[priority] - a.score[priority];
    }
  }
  return 0;
}

function getEmptyCells(board) {
  const res = [];
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (board[x][y] === '_')
        res.push([x, y])
    }
  }
  return res;
}

export default class BasicAiPlayer {
  static onGameEnd(room, ownIdx) {
    room.players[ownIdx].isReady = true;
  }

  static onRoomUpdate(room, ownIdx) {
    if (ownIdx != room.game.currentPlayerIdx || !room.game.isInProgress) return;
    const {game, players} = room;
    const own = players[ownIdx];

    const moves = getEmptyCells(game.board).map((cell) => {
      const board = game.board.map(function (row) {
        return row.slice(0);
      });
      board[cell[0]][cell[1]] = own.mark;
      const score = calcScores(board, own.mark);
      console.log(`player ${ownIdx} scored ${cell} as ${score}`);
      return {
        cell,
        score
      };
    }).sort(scoreComparator);

    let numOfBestMoves = 1;
    let firstMove = moves[0];
    for (let i = 1; i < moves.length; i++) {
      if (0 !== scoreComparator(firstMove, moves[i])) {
        break;
      } else {
        numOfBestMoves++;
      }
    }
    let selectedMove = moves[Math.floor(Math.random() * numOfBestMoves)].cell;

    room.gameAction({type: 'MARK_CELL', payload: {x: selectedMove[0], y: selectedMove[1]}});
  }
}
