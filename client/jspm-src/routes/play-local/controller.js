import '../room/index.css!';

import Cell from '../../games/ticTacToe/rules/cell';

export default ['$scope', '$routeParams', 'SessionFactory',
  function ($scope, $routeParams, SessionFactory) {
    $scope.session = SessionFactory.create($routeParams.gameTypeId, function(result) {
      $scope.session.players[0].ready = false;

      if (result === 'tie') {
        $scope.session.result = 'tie';
      } else {
        $scope.room.stat[$scope.session.currentPlayer.idx]++;

        if (result === 'c0') {
          $scope.session.result = {c1: 0, r1: 0, c2: 0, r2: 2};
        }
        if (result === 'c1') {
          $scope.session.result = {c1: 1, r1: 0, c2: 1, r2: 2};
        }
        if (result === 'c2') {
          $scope.session.result = {c1: 2, r1: 0, c2: 2, r2: 2};
        }
        if (result === 'r0') {
          $scope.session.result = {c1: 0, r1: 0, c2: 2, r2: 0};
        }
        if (result === 'r1') {
          $scope.session.result = {c1: 0, r1: 1, c2: 2, r2: 1};
        }
        if (result === 'r2') {
          $scope.session.result = {c1: 0, r1: 2, c2: 2, r2: 2};
        }
        if (result === 'd0') {
          $scope.session.result = {c1: 0, r1: 0, c2: 2, r2: 2};
        }
        if (result === 'd1') {
          $scope.session.result = {c1: 0, r1: 2, c2: 2, r2: 0};
        }
      }
    });

    $scope.session.players[0].ready = true;
    $scope.session.players[1].ready = true;

    $scope.session.players[0].color = 'rgb(100, 100, 193)';
    $scope.session.players[1].color = 'rgb(234, 123, 123)';

    $scope.Cell = Cell;

    $scope.room = {
      status: 'IN_PROGRESS',
      gameType: {
        templateUrl: 'games/ticTacToe/board.html'
      },
      stat: [0, 0]
    };
    $scope.own = $scope.session.players[0];
    $scope.opp = $scope.session.players[1];

    $scope.ready = function() {
      $scope.session.recycle();
      $scope.session.players[0].ready = true;
    };
  }];
