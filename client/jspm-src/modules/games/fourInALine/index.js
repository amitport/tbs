import boardTpl from './board.html';
import './index.css';

import gamesModule from '../base';
import Game from '../game';

gamesModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('FourInALine', '<four-in-a-line game="$ctrl.game" players="$ctrl.players" own="$ctrl.own"></four-in-a-line>');
}]);

const clientPath = 'modules/games/fourInALine/'; // todo use __moduleName when moving to jspm 0.17

gamesModule.component('fourInALine', {
  templateUrl: boardTpl,
  bindings: {
    game: '<',
    players: '<',
    own: '<'
  },
  require: {
    room: '^room'
  },
  controller: class FourInALine extends Game {
    static get $inject() {return ['playerColors']}
    static get mark2Fill() {
      return {
        '_': `${clientPath}circle-fill.svg`,
        'r': `${clientPath}circle-fill-red.svg`,
        'b': `${clientPath}circle-fill-blue.svg`
      }
    }

    constructor(playerColors) {super(); this.playerColors = playerColors;}

    outcomeColor() {
      return this.game.outcome.color === 'b' ?
        this.playerColors[0] : this.playerColors[1];
    }

    mark2Fill(mark) {
      return FourInALine.mark2Fill[mark];
    }
  }
});
