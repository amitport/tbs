import './index.css!';

export default function (roomId, io) {
  return {
    templateUrl: 'games/fourInALine/board.html',
    deserializeSession: function (raw, players) {
      const res = {
        board: raw.board,
        currentPlayer: players[raw.currentPlayerIdx],
        markToFill: {
          '_': 'games/fourInALine/circle-fill.svg',
          'r': 'games/fourInALine/circle-fill-red.svg',
          'b': 'games/fourInALine/circle-fill-blue.svg'
        },
        markCol: function (c) {
          io.emit('session:action', {roomId, actionId: 'markCol', c});
        },
        isEnded: function () {
          return this.hasOwnProperty('result');
        }
      };
      if (raw.result) {
        res.result = (raw.result === 'tie') ? 'tie' : {
          c1: raw.result.c1,
          r1: raw.result.r1,
          c2: raw.result.c2,
          r2: raw.result.r2,
          color: raw.result.color === 'b' ? 'rgb(100, 100, 193)' : 'rgb(234, 123, 123)'
        }
      }
      return res;
    }
  }
};
