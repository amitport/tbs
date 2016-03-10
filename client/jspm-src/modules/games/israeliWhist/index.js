import indexTpl from './index.html!text';

import module from '../base';
import Game from '../game';

module.run(['$templateCache', function ($templateCache) {
  $templateCache.put('IsraeliWhist', '<israeli-whist game="$ctrl.game" players="$ctrl.players" own="$ctrl.own"></israeli-whist>');
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
