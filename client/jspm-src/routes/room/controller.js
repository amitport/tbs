import './index.css!';

import Room from './room';

export default ['$scope', '$routeParams', '$mdDialog', '$location', 'gameClientRepo', 'io',
  function ($scope, $routeParams, $mdDialog, $location, gameClientRepo, io) {
    $scope.roomId = $routeParams.roomId;

    io.connect($scope)
      .on('room:update', function (room) {
        $scope.room.update(room);
        //$scope.session = $scope.room.session;
      });

    io.emit('room:join', $scope.roomId).then(function (msg) {
      $scope.room = new Room(msg.room, msg.room.gameId, msg.ownIdx, $scope.roomId, io, $scope, gameClientRepo);
      //$scope.session = $scope.room.session;
      //
      //$scope.own = $scope.room.players.own;
      //$scope.opp = $scope.room.players.opp;
    }, function (err) {
      console.error(err);
    });

    $scope.ready = function () {
      io.emit('room:ready', $scope.roomId);
    };

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
