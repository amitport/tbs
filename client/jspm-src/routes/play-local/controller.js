import '../room/index.css!';
import Room from '../room/room';

export default ['$scope', '$routeParams', 'gameClientRepo',
  function ($scope, $routeParams, gameClientRepo) {
    const gameClient = gameClientRepo.get($routeParams.gameTypeId);
    const session = gameClient.createLocalSession(function(result) {
      if (result !== 'tie') {
        $scope.room.stat[$scope.room.session.currentPlayer.idx]++;
      }
    });
    const rawRoom = {
      status: 'IN_PROGRESS',
      stat: [0, 0],
      session,
      players: session.players
    };
    $scope.room = new Room(rawRoom, /*0*/ null,
      /*gameClient.applyGameType(
        ({type, payload}) => {session[type](payload);}
      )*/ null
      , true,
      function() {
        $scope.room.session.recycle();
        $scope.room.session.players[0].ready = true;
      }
    );
  }];
