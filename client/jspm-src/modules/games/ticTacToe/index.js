import Control from 'master-class/lib/utils/control';

import boardTpl from './board.html!text';
import winnerLineTpl from './winner-line.html!text';
import cellTpl from './cell.html!text';

import './index.css!';

import module from '../base';

module.run(['$templateCache', function ($templateCache) {
  $templateCache.put('TicTacToe', '<tic-tac-toe game="$ctrl.game" own="$ctrl.own"></tic-tac-toe>');
}]);

module.component('ticTacToe', {
  template: boardTpl,
  bindings: {
    gameOld: '<game',
    own: '<'
  },
  require: {
    room: '^room'
  },
  controller: class {
    static $inject = ['$scope'];
    constructor($scope) {
      const self = this;
      const control = new Control({
        onMutatorCall: function (keyPath, args, mutator) {
          if (this === this.game.currentPlayer) {
            // assume all mutation actions start on the currentPlayer
            self.room.gameAction({type: keyPath[keyPath.length - 1], payload: args[0]});
          }

          // perform an optimistic update
          mutator.call(this, args[0], self.room.statistics);
        }
      });
      $scope.$watch('$ctrl.gameOld', (game) => {
        this.game = this.room.gameType.Game.createInstance(game, control);
      })
    }
  }
});

module.component('winnerLine', {
  template: winnerLineTpl,
  bindings: {
    line: '@',
    color: '@'
  },
  controller: class WinnerLine {
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
      this.points = WinnerLine.line2points[this.line];
    }
  }
});

module.directive('cell', ['playerColors', function (playerColors) {
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

        scope.markColor = {X: playerColors[0], O: playerColors[1]}[newValue];
        scope.markIcon = {X: 'close', O: 'panorama_fish_eye'}[newValue];
      });
    }
  };
}]);

