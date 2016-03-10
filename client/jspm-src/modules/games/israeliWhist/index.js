import indexTpl from './index.html!text';

import module from '../base';
import Game from '../game';

module.run(['$templateCache', function ($templateCache) {
  $templateCache.put('IsraeliWhist', '<israeli-whist layout layout-fill style="border: 4px solid yellow" game="$ctrl.game" players="$ctrl.players" own="$ctrl.own"></israeli-whist>');
}]);

module.component('israeliWhist', {
  template: indexTpl,
  bindings: {
    game: '<',
    players: '<',
    own: '<'
  },
  require: {
    room: '^room'
  },
  controller: class IsraeliWhist extends Game {

  }
});


import cardStackTpl from './card-stack.html!text';
module.component('cardStack', {
  template: cardStackTpl,
  bindings: {
    cards: '='
  },
  controller: class CardStack {
  }
});
