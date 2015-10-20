import abstractGameConfig from '../../abstract/client/config';

const path = 'games/ticTacToe/client/';

export default {
  path,
  markColors: {
    '_': null,
    'X': abstractGameConfig.playerColors[0],
    'O': abstractGameConfig.playerColors[1]
  },
  markIcons: {
    '_': null,
    'X': `${path}X.svg`,
    'O': `${path}O.svg`
  }

}