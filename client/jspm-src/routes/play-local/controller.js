import '../room/index.css!';

import Cell from '../../games/ticTacToe/rules/cell';
import GameViewManagersRepo from '../../modules/games/gameViewManagersRepo';

export default ['$scope', '$routeParams', 'SessionFactory',
  function ($scope, $routeParams, SessionFactory) {
    const gameViewManager = GameViewManagersRepo.get($routeParams.gameTypeId);

    $scope.session = SessionFactory.create($routeParams.gameTypeId, function(result) {
      gameViewManager.onGameEnd(result, $scope.session);

      $scope.session.players[0].ready = false;

      if (result !== 'tie') {
        $scope.room.stat[$scope.session.currentPlayer.idx]++;
      }
    }, true);

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
