import './index.css!';

import Room from './room';

export default ['$scope', '$routeParams', '$mdDialog', '$location', 'gameClientRepo', 'io',
  function ($scope, $routeParams, $mdDialog, $location, gameClientRepo, io) {
    io.connect($scope)
      .on('room:update', function (room) {
        $scope.room.update(room);
      });

    io.emit('room:join', $routeParams.roomId).then(function (msg) {
      var gameClient = gameClientRepo.get(msg.room.gameId);
      $scope.room = new Room(msg.room, msg.ownIdx, gameClient, io, $routeParams.roomId);
    }, function (err) {
      console.error(err);
    });

    $scope.$watch('room.status', function (newVal) {
      if (newVal === 'WAITING_FOR_SECOND_PLAYER') {
        $mdDialog.show(
          {
            templateUrl: 'routes/room/waitForOppDialog.html',
            locals: {
              address: $location.absUrl()
            },
            controller: ['$scope', 'address', function ($scope, address) {
              $scope.address = address;
            }]
          });
      } else if (newVal === 'IN_PROGRESS') {
        $mdDialog.hide();
      }
    });
    $scope.$on('$destroy', function () {
      $mdDialog.hide();
    });
  }];
