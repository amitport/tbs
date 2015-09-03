import Master from '../master/index';
import AbstractGameClient from '../../abstract/client/index';

import './index.css!';

const clientPath = 'games/fourInALine/client/';

export default class FourInALineGameClient extends AbstractGameClient {
  constructor() {
    super(Master);
  }

  applyGameType(roomId, io) {
    return {
      templateUrl: `${clientPath}board.html`,
      deserializeSession: function (raw, players) {
        const res = {
          board: raw.board,
          currentPlayer: players[raw.currentPlayerIdx],
          markToFill: {
            '_': `${clientPath}circle-fill.svg`,
            'r': `${clientPath}circle-fill-red.svg`,
            'b': `${clientPath}circle-fill-blue.svg`
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
  }
}
