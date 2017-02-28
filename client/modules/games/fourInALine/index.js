import boardTpl from './board.html';
import './index.css';

import gamesModule from '../base';
import Game from '../game';

import circleSvgUrl from './circle.svg';
import circleFillSvgUrl from './circle-fill.svg';
import circleFillRedSvgUrl from './circle-fill-red.svg';
import circleFillBlueSvgUrl from './circle-fill-blue.svg';
gamesModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('FourInALine', '<four-in-a-line game="$ctrl.game" players="$ctrl.players" own="$ctrl.own"></four-in-a-line>');
}]);

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
        '_': circleFillSvgUrl,
        'r': circleFillRedSvgUrl,
        'b': circleFillBlueSvgUrl
      }
    }

    constructor(playerColors) {
      super();
      this.playerColors = playerColors;
      this.circleSvgUrl = circleSvgUrl;
    }

    outcomeColor() {
      return this.game.outcome.color === 'b' ?
        this.playerColors[0] : this.playerColors[1];
    }

    mark2Fill(mark) {
      return FourInALine.mark2Fill[mark];
    }
  }
});
