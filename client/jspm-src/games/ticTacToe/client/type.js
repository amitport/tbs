import './index.css!';

import Board from '../master/board';


import Cell from '../master/cell';
import client from './index';

const clientPath = 'games/ticTacToe/client/';

export default function (roomId, io, scope) {
  scope.Cell = Cell;

  return {
    templateUrl: `${clientPath}board.html`,
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
        client.prototype.onGameEnd(raw.result, res);
      }

      return res;
    }
  }
};
