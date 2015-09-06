import Session from '../../abstract/master/session';
import Player from './player';

import BasicAi from './ai/basic';

import Cell from './cell';
import Board from './board';

class TicTacToe extends Session {
  constructor(gameEndedCb, ai) {
    super([new Player(0, Cell.X), ai ? new BasicAi(1, Cell.O) : new Player(1, Cell.O)], gameEndedCb);

    if (ai) this.players[1].setSession(this);
  }

  initialize() {
    this.totalMoves = 0;
    this.board = new Board();
    this.currentPlayer = this.players[0];//Math.floor(Math.random() + 0.5)];
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
    const result = this.isOver();

    if (result) {
      this.gameEndedCb(this.result = result);
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
