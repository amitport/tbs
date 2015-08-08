import Session from '../../session';
import HumanPlayer from '../../humanPlayer';

import Cell from './cell';
import Board from './board';

class TicTacToeHumanPlayer extends HumanPlayer {
  constructor(idx, mark) {
    super(idx);
    this.mark = mark
  }
  serialize() {
    return {mark: this.mark.key};
  }
}

class TicTacToe extends Session {
  constructor(gameEndedCb) {
    super([new TicTacToeHumanPlayer(0, Cell.X), new TicTacToeHumanPlayer(1, Cell.O)], gameEndedCb);
  }

  init() {
    delete this.result;
    this.totalMoves = 0;
    this.board = new Board();
    this.currentPlayer = this.players[Math.floor(Math.random() + 0.5)];
    this.currentPlayer.makeMove();
  }

  isOver() {
    for (let i0 = 0; i0 < 3; i0++) {
      const i1 = (i0 + 1) % 3;
      const i2 = (i0 + 2) % 3;

      const c0 = this.board[i0][i0];
      if (c0 !== Cell.EMPTY) {
        if (c0 === this.board[i0][i1] && c0 === this.board[i0][i2]) {
          return 'r' + i0;
        }
        if (c0 === this.board[i1][i0] && c0 === this.board[i2][i0]) {
          return 'c' + i0;
        }
      }
    }

    const c0 = this.board[1][1];
    if (c0 !== Cell.EMPTY) {
      if (c0 === this.board[0][0] && c0 === this.board[2][2]) {
        return 'd0';
      }
      if (c0 === this.board[2][0] && c0 === this.board[0][2]) {
        return 'd1';
      }
    }

    if (this.totalMoves === 9) {
      return 'tie';
    }
  }

  markCell(msg) {
    const {x, y} = msg;
    this.board[x][y] = this.currentPlayer.mark;
    this.totalMoves++;
    this.result = this.isOver();

    if (this.result) {
      this.gameEndedCb(this.result);
    } else {
      this.currentPlayer = this.currentPlayer.next;
      this.currentPlayer.makeMove();
    }
  }

  serialize() {
    return {
      board: this.board.serialize(),
      result: this.result,
      currentPlayerIdx: this.currentPlayer.idx
    }
  }
}

export default TicTacToe;