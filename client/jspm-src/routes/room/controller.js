import './index.css!';


import Player from './player';

export default ['$scope', '$routeParams', '$mdDialog', '$location', 'io',
  function ($scope, $routeParams, $mdDialog, $location, io) {
    $scope.roomId = $routeParams.roomId;

    io.connect($scope);

    io.emit('room:join', $scope.roomId).then(function (msg) {
      $scope.room = msg.room;
      $scope.gameId = msg.gameId;

      const players = Player.deserializeAll(msg.room.players, msg.ownIdx);
      $scope.own = players.own;
      $scope.opp = players.opp;
    }, function (err) {
      console.error(err);
    });

    $scope.$watch('room.status', function (newVal) {
      if (newVal === 'WAITING_FOR_SECOND_PLAYER') {
        $mdDialog.show(
          {
            template: '<md-dialog flex>' +
            ' <md-dialog-content>' +
            '   <h2 class="md-title">Tell a friend to join</h2>' +
            '   <md-input-container>' +
            '     <label>Address</label>' +
            '     <input disabled ng-model="address">' +
            '   </md-input-container>' +
            //'    <clipboard content="{{address}}"></clipboard>' +
            '  </md-dialog-content>' +
            '</md-dialog>',
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
