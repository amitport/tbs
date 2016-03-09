import boardTpl from './board.html!text';
import './index.css!';

import module from '../base';

module.run(['$templateCache', function ($templateCache) {
  $templateCache.put('FourInALine', '<four-in-a-line game="$ctrl.game" players="$ctrl.players" own="$ctrl.own"></four-in-a-line>');
}]);

const clientPath = 'modules/games/fourInALine/';

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

    static mark2Fill = {
      '_': `${clientPath}circle-fill.svg`,
      'r': `${clientPath}circle-fill-red.svg`,
      'b': `${clientPath}circle-fill-blue.svg`
    };

    outcomeColor() {
      return this.game.outcome.color === 'b' ?
        'rgb(100, 100, 193)' : 'rgb(234, 123, 123)';
    }

    mark2Fill(mark) {
      return FourInALine.mark2Fill[mark];
    }

    markCol(payload) {
      this.room.gameAction({type: 'MARK_COL', payload});
    };
  }
});
