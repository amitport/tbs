import boardTpl from './board.html!text';
import './index.css!';

import module from '../base';

module.run(['$templateCache', function ($templateCache) {
  $templateCache.put('FourInALine', '<four-in-a-line game="$ctrl.game" players="$ctrl.players" own="$ctrl.own"></four-in-a-line>');
}]);

const clientPath = 'modules/games/fourInALine/'; // todo use __moduleName when moving to jspm 0.17

module.component('fourInALine', {
  template: boardTpl,
  bindings: {
    game: '<',
    players: '<',
    own: '<'
  },
  require: {
    room: '^room'
  },
  controller: class FourInALine {
    static $inject = ['playerColors'];
    static mark2Fill = {
      '_': `${clientPath}circle-fill.svg`,
      'r': `${clientPath}circle-fill-red.svg`,
      'b': `${clientPath}circle-fill-blue.svg`
    };

    constructor(playerColors) {this.playerColors = playerColors;}

    outcomeColor() {
      return this.game.outcome.color === 'b' ?
        this.playerColors[0] : this.playerColors[1];
    }

    mark2Fill(mark) {
      return FourInALine.mark2Fill[mark];
    }

    markCol(payload) {
      this.room.gameAction({type: 'MARK_COL', payload});
    };
  }
});
