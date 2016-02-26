import './index.css!';

export default class Room {
  constructor($scope, $routeParams, $mdDialog, $location, $log, gameClientRepo, io, user) {
    io.connect($scope)
      .on('room:update', this.update.bind(this));

    this.roomId = $routeParams.roomId;
    this.io = io;

    user.signInPromise.finally(() => {
      io.emit('room:join', {roomId: this.roomId, username: user.username}).then((msg) => {
        this.gameClient = gameClientRepo.get(msg.room.gameId);

        this.session = this.gameClient.createSessionProxy({}, msg.ownIdx, this.roomId, io);

        this.members = msg.room.members;
        this.members.opp = this.members[(msg.ownIdx + 1) % 2];
        this.members.own = this.members[msg.ownIdx];

        this.update(msg.room);
      }, function (err) {
        $log.error(err);
      });
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
  }

  update(raw) {
    this.status = raw.status;
    this.stat = raw.stat;

    for (let i = 0, len = this.members.length; i < len; i++) {
      Object.assign(this.members[i], raw.members[i]);
    }

    if (raw.session) this.gameClient.updateSessionState(this.session, raw.session);
  }

  ready() {
    this.io.emit('room:ready', this.roomId);
  }
}

Room.$inject = ['$scope', '$routeParams', '$mdDialog', '$location', '$log', 'gameClientRepo', 'io', 'ap.user'];
