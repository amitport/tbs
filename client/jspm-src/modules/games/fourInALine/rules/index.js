import Session from '../../lib/session';
import HumanPlayer from '../../lib/humanPlayer';


class FourInALineHumanPlayer extends HumanPlayer {
  constructor(idx, mark) {
    super(idx);
    this.mark = mark
  }

  serialize() {
    return {};
  }
}

class FourInALine extends Session {
  constructor(gameEndedCb) {
    super([new FourInALineHumanPlayer(0, 'b'), new FourInALineHumanPlayer(1, 'r')], gameEndedCb);
  }

  init() {
    delete this.result;
    this.totalMoves = 0;
    this.board = [
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_']
    ];

    this.currentPlayer = this.players[Math.floor(Math.random() + 0.5)];
    this.currentPlayer.makeMove();
  }

  isOver(r, c) {
    let count = 1, color = this.board[r][c];

    let cLeft, cRight, rBottom, rTop;
    // horizontal
    for (cLeft = c - 1; cLeft >= 0 && color === this.board[r][cLeft]; cLeft--, count++);
    for (cRight = c + 1; cRight < 7 && color === this.board[r][cRight]; cRight++, count++);

    if (count >= 4) {
      return {c1: cLeft + 1, r1: r, c2: cRight - 1, r2: r, color};
    } else {
      count = 1;
      // vertical
      for (rBottom = r + 1; rBottom < 6 && color === this.board[rBottom][c]; rBottom++, count++);
      if (count >= 4) {
        return {c1: c, r1: r, c2: c, r2: rBottom - 1, color};
      } else {
        count = 1;

        // diagonal left-top
        for (rBottom = r + 1, cLeft = c - 1; rBottom < 6 && cLeft >= 0 && color === this.board[rBottom][cLeft]; rBottom++, cLeft--, count++);
        for (rTop = r - 1, cRight = c + 1; rTop >= 0 && cRight < 7 && color === this.board[rTop][cRight]; rTop--, cRight++, count++);

        if (count >= 4) {
          return {c1: cLeft + 1, r1: rBottom - 1, c2: cRight - 1, r2: rTop + 1, color};
        } else {
          count = 1;

          // diagonal left-bottom
          for (rTop = r - 1, cLeft = c - 1; rTop >= 0 && cLeft >= 0 && color === this.board[rTop][cLeft]; rTop--, cLeft--, count++);
          for (rBottom = r + 1, cRight = c + 1; rBottom < 6 && cRight < 7 && color === this.board[rBottom][cRight]; rBottom++, cRight++, count++);

          if (count >= 4) {
            return {c1: cLeft + 1, r1: rTop + 1, c2: cRight - 1, r2: rBottom - 1, color};
          }
        }
      }
    }

    if (this.totalMoves === 42) {
      return 'tie';
    }
  }

  markCol(msg) {
    const {c} = msg;
    for (var r = 5; r >= 0; r--) {
      if (this.board[r][c] === '_') {
        this.board[r][c] = this.currentPlayer.mark;
        this.totalMoves++;
        this.result = this.isOver(r, c);

        if (this.result) {
          this.gameEndedCb(this.result);
        } else {
          this.currentPlayer = this.currentPlayer.next;
          this.currentPlayer.makeMove();
        }
        break;
      }
    }
  }

  serialize() {
    return {
      board: this.board,
      result: this.result,
      currentPlayerIdx: this.currentPlayer.idx
    }
  }
}

export default FourInALine;
