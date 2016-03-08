import template from './board.html!text';
import './index.css!';

const clientPath = 'modules/games/ticTacToe/';

import module from '../base';

module.run(['$templateCache', function ($templateCache) {
  $templateCache.put('TicTacToe', template);
}]);

module.directive('cell', function () {
  return {
    scope: true,
    templateUrl: `${clientPath}cell.html`,
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

