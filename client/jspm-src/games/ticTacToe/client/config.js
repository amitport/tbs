import AbstractGameClient from '../../abstract/client/index';

const path = 'games/ticTacToe/client/';

export default {
  path,
  markColors: {
    '_': null,
    'X': AbstractGameClient.playerColors[0],
    'O': AbstractGameClient.playerColors[1]
  },
  markIcons: {
    '_': null,
    'X': `${path}X.svg`,
    'O': `${path}O.svg`
  }

}
