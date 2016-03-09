import boardTpl from './board.html!text';
import winnerLineTpl from './winner-line.html!text';
import cellTpl from './cell.html!text';

import './index.css!';

const clientPath = 'modules/games/ticTacToe/';

import module from '../base';

module.run(['$templateCache', function ($templateCache) {
  $templateCache.put('TicTacToe', '<tic-tac-toe game="$ctrl.game" players="$ctrl.players" own="$ctrl.own"></tic-tac-toe>');
}]);

module.component('ticTacToe', {
  template: boardTpl,
  bindings: {
    game: '<',
    players: '<',
    own: '<'
  },
  controller: class {
    $onInit() {
    }
  }
});

module.component('winnerLine', {
  template: winnerLineTpl,
  bindings: {
    line: '@',
    color: '@'
  },
  controller: class WinnerLineController {
    static line2points = {
      'c0': {c1: 0, r1: 0, c2: 0, r2: 2},
      'c1': {c1: 1, r1: 0, c2: 1, r2: 2},
      'c2': {c1: 2, r1: 0, c2: 2, r2: 2},
      'r0': {c1: 0, r1: 0, c2: 2, r2: 0},
      'r1': {c1: 0, r1: 1, c2: 2, r2: 1},
      'r2': {c1: 0, r1: 2, c2: 2, r2: 2},
      'd0': {c1: 0, r1: 0, c2: 2, r2: 2},
      'd1': {c1: 0, r1: 2, c2: 2, r2: 0}
    };
    $onInit() {
      this.points = WinnerLineController.line2points[this.line];
    }
  }
});

module.directive('cell', function () {
  return {
    scope: true,
    template: cellTpl,
    link: function (scope, iElement, iAttrs) {

      const x = scope.x = iAttrs.x;
      const y = scope.y = iAttrs.y;
      if (x === '1' || y === '1') {
        scope.borderStyle = {
          'border-style': 'solid'
        };
        if (x !== '1') {
          scope.borderStyle['border-width'] = '0 1px';
        } else if (y !== '1') {
          scope.borderStyle['border-width'] = '1px 0';
        } else {
          scope.borderStyle['border-width'] = '1px';
        }
      }

      scope.$watch(`$ctrl.game.board[${iAttrs.x}][${iAttrs.y}]`, function (newValue) {

        scope.markColor = {X: 'rgb(100, 100, 193)', O: 'rgb(234, 123, 123)'}[newValue];
        scope.markIcon = {X: 'close', O: 'panorama_fish_eye'}[newValue];
      });
    }
  };
});

