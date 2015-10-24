import '../room/index.css!';

import Cell from '../../games/ticTacToe/master/cell';

const clientPath = 'games/ticTacToe/client/';

export default ['$scope', '$routeParams', 'gameClientRepo',
  function ($scope, $routeParams, gameClientRepo) {
    const gameClient = gameClientRepo.get($routeParams.gameTypeId);
    $scope.room = {
      status: 'IN_PROGRESS',
      stat: [0, 0]
    };
    $scope.room.session = gameClient.createLocalSession(function(result) {
      if (result !== 'tie') {
        $scope.room.stat[$scope.room.session.currentPlayer.idx]++;
      }
    });


    $scope.room.players = {
      own: $scope.room.session.players[0],
      opp: $scope.room.session.players[1]
    };

    $scope.ready = function() {
      $scope.room.session.recycle();
      $scope.room.session.players[0].ready = true;
    };
  }];
