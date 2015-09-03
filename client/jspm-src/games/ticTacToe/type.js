import './index.css!';

import Board from './rules/board';


import Cell from './rules/cell';
import manager from './manager';

export default function (roomId, io, scope) {
  scope.Cell = Cell;

  return {
    templateUrl: 'games/ticTacToe/board.html',
    deserializeSession: function (raw, players) {
      const res = {
        board: Board.deserialize(raw.board),
        currentPlayer: players[raw.currentPlayerIdx],
        markCell: function (payload) {
          io.emit('session:action', {roomId, actionId: 'markCell', x: payload.x, y: payload.y});
        },
        isEnded: function () {
          return this.hasOwnProperty('result');
        }
      };
      if (raw.result) {
        manager.onGameEnd(raw.result, res);
      }

      return res;
    }
  }
};
