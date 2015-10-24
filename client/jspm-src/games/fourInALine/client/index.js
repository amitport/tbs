import Master from '../master/index';
import AbstractGameClient from '../../abstract/client/index';
import abstractGameConfig from '../../abstract/client/config';

import './index.css!';

const clientPath = 'games/fourInALine/client/';

export default class FourInALineGameClient extends AbstractGameClient {
  constructor() {
    super(Master, `${clientPath}board.html`);
  }

  applyGameType(dispatch) {
    return {
      deserializeSession: (raw, players) => {
        const res = {
          board: raw.board,
          currentPlayer: players[raw.currentPlayerIdx],
          markToFill: {
            '_': `${clientPath}circle-fill.svg`,
            'r': `${clientPath}circle-fill-red.svg`,
            'b': `${clientPath}circle-fill-blue.svg`
          },
          markCol: function (c) {
            dispatch({type: 'markCol', payload: {c}});
          },
          isEnded: function () {
            return this.hasOwnProperty('result');
          },
          templateUrl: this.templateUrl
        };
        if (raw.result) {
          res.result = (raw.result === 'tie') ? 'tie' : {
            c1: raw.result.c1,
            r1: raw.result.r1,
            c2: raw.result.c2,
            r2: raw.result.r2,
            color: raw.result.color === 'b' ? abstractGameConfig.playerColors[0] : abstractGameConfig.playerColors[1]
          }
        }
        return res;
      }
    }
  }
}
