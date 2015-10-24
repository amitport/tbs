import Master from '../master/index';
import AbstractGameClient from '../../abstract/client/index';
import abstractGameConfig from '../../abstract/client/config';

import './index.css!';

const clientPath = 'games/fourInALine/client/';

export default class FourInALineGameClient extends AbstractGameClient {
  constructor() {
    super(Master, `${clientPath}board.html`, ['markCol']);
  }

  createSession(initialState, dispatch) {
    const session = super.createSession(initialState, dispatch);
    session.markToFill = {
      '_': `${clientPath}circle-fill.svg`,
      'r': `${clientPath}circle-fill-red.svg`,
      'b': `${clientPath}circle-fill-blue.svg`
    };
    return session;
  }

  updateGameResult(result, session) {
    session.result = (result === 'tie') ? 'tie' : {
      c1: result.c1,
      r1: result.r1,
      c2: result.c2,
      r2: result.r2,
      color: result.color === 'b' ? abstractGameConfig.playerColors[0] : abstractGameConfig.playerColors[1]
    }
  }
}
