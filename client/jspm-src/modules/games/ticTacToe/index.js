let markColors = {
  '_': null,
  'X': 'rgb(100, 100, 193)',
  'O': 'rgb(234, 123, 123)'
};
let markIcons = {
  '_': null,
  'X': 'modules/games/ticTacToe/X.svg',
  'O': 'modules/games/ticTacToe/O.svg'
};

export default function (app) {
  app.directive('cell', function() {
    return {
      scope: true,
      templateUrl: 'modules/games/ticTacToe/cell.html',
      link: function(scope, iElement, iAttrs) {

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

        scope.$watch(`session.board[${iAttrs.x}][${iAttrs.y}]`, function(newValue) {
          scope.markColor = markColors[newValue];
          scope.markIcon = markIcons[newValue];
        });
      }
    };
  });
}
