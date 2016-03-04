import './index.css!';

export default class Room {
  static $inject = ['$scope', '$routeParams', '$location', '$log', 'gameClientRepo', 'io', 'ap.user'];

  constructor($scope, $routeParams, $location, $log, gameClientRepo, io, user) {
    io.connect($scope)
      .on('room:update', this.update.bind(this));

    const roomId = this.roomId = $routeParams.roomId;
    this.io = io;
    this.address = $location.absUrl();
    user.signInPromise.finally(() => {
      io.emit('room:join', {roomId: this.roomId, username: user.username || '{Anonymous}'}).then((msg) => {
        this.gameClient = gameClientRepo.get(msg.room.gameId);
        this.session = this.gameClient.createSessionProxy({}, msg.ownIdx, this.roomId, io);

        this.members = msg.room.members;
        this.members.opp = this.members[(msg.ownIdx + 1) % 2];
        this.members.own = this.members[msg.ownIdx];
        this.members.own.idx = msg.ownIdx;
        this.hasAi = this.gameClient.hasAi;
        if (!this.hasAi) {
          this.members[1].type = 'Human';
        }

        this.update(msg.room);
      }, function (err) {
        $log.error(err);
      });
    });

    $scope.$watch('room.members[1].type', (newVal) => {
      if (newVal === 'AI') {
        io.emit('room:setAiOpponent',
          {
            roomId
          }
        );
      }
    });
  }

  update(raw) {
    this.stat = raw.stat;

    for (let i = 0, len = this.members.length; i < len; i++) {
      Object.assign(this.members[i], raw.members[i]);
    }

    if (raw.session) this.gameClient.updateSessionState(this.session, raw.session);
  }

  ready(ready = true) {
    this.io.emit('room:ready', {
        roomId: this.roomId,
        isReady: ready
      }
    );
  }
}
