import '../room/index.css!';

import Cell from '../../games/ticTacToe/master/cell';

const clientPath = 'games/ticTacToe/client/';

export default ['$scope', '$routeParams', 'gameClientRepo',
  function ($scope, $routeParams, gameClientRepo) {
    const gameClient = gameClientRepo.get($routeParams.gameTypeId);
    $scope.session = gameClient.createLocalSession(function(result) {
      if (result !== 'tie') {
        $scope.room.stat[$scope.session.currentPlayer.idx]++;
      }
    });

    $scope.room = {
      status: 'IN_PROGRESS',
      stat: [0, 0]
    };
    $scope.own = $scope.session.players[0];
    $scope.opp = $scope.session.players[1];

    $scope.ready = function() {
      $scope.session.recycle();
      $scope.session.players[0].ready = true;
    };
  }];
