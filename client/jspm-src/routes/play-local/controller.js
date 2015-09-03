import '../room/index.css!';

import AbstractGameClient from '../../games/abstract/client/index';

import Cell from '../../games/ticTacToe/master/cell';

const clientPath = 'games/ticTacToe/client/';

export default ['$scope', '$routeParams', 'gameClientRepo',
  function ($scope, $routeParams, gameClientRepo) {
    $scope.session = gameClientRepo.get($routeParams.gameTypeId).createLocalSession(function(result) {
      $scope.session.players[0].ready = false;

      if (result !== 'tie') {
        $scope.room.stat[$scope.session.currentPlayer.idx]++;
      }
    }, true);

    $scope.session.players[0].ready = true;
    $scope.session.players[1].ready = true;

    $scope.session.players[0].color = AbstractGameClient.playerColors[0];
    $scope.session.players[1].color = AbstractGameClient.playerColors[1];

    $scope.Cell = Cell;

    $scope.room = {
      status: 'IN_PROGRESS',
      gameType: {
        templateUrl: `${clientPath}board.html`
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
