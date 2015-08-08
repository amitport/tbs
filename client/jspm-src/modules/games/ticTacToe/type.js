import './index.css!';

export default function (roomId, io) {
  return {
    templateUrl: 'modules/games/ticTacToe/board.html',
    deserializeSession: function (raw, players) {
      const res = {
        board: raw.board,
        currentPlayer: players[raw.currentPlayerIdx],
        markCell: function (x, y) {
          io.emit('session:action', {roomId, actionId: 'markCell', x, y});
        }
      };
      if (raw.result) {
        if (raw.result === 'tie') {
          res.result = 'tie';
        } else {
          if (raw.result === 'c0') {
            res.result = {c1: 0, r1: 0, c2: 0, r2: 2};
          }
          if (raw.result === 'c1') {
            res.result = {c1: 1, r1: 0, c2: 1, r2: 2};
          }
          if (raw.result === 'c2') {
            res.result = {c1: 2, r1: 0, c2: 2, r2: 2};
          }
          if (raw.result === 'r0') {
            res.result = {c1: 0, r1: 0, c2: 2, r2: 0};
          }
          if (raw.result === 'r1') {
            res.result = {c1: 0, r1: 1, c2: 2, r2: 1};
          }
          if (raw.result === 'r2') {
            res.result = {c1: 0, r1: 2, c2: 2, r2: 2};
          }
          if (raw.result === 'd0') {
            res.result = {c1: 0, r1: 0, c2: 2, r2: 2};
          }
          if (raw.result === 'd1') {
            res.result = {c1: 0, r1: 2, c2: 2, r2: 0};
          }
        }
      }


      return res;
    }
  }
};