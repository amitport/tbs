import './index.css!';
import * as gameTypes from '../../games/index';

export default class Room {
  static $inject = ['$scope', '$routeParams', '$location', '$log', 'io', 'ap.user'];

  constructor($scope, $routeParams, $location, $log, io, user) {
    const ioConnection = io.connect($scope);

    const roomId = this.roomId = $routeParams.roomId;
    this.io = io;
    this.address = $location.absUrl();
    user.signInPromise.finally(() => {
      io.emit('room:join', {roomId: this.roomId, username: user.username || '{Anonymous}'})
        .then((serializedRoom) => {
          this.update(serializedRoom);

          ioConnection.on('room:update', this.update.bind(this));
        })
      .catch(function (err) {
        $log.error(err);
      });
    });

    $scope.$watch('$ctrl.players[1].type', (newVal) => {
      if (newVal === 'ai') {
        io.emit('room:joinAi',
          {
            roomId
          }
        );
      } else if (newVal === 'human' && this.ownIdx != 1) {
        io.emit('room:setIsOpen',
          {
            roomId, playerIdx: 1, isOpen: true
          }
        );
      }
    });
  }

  update(serializedRoom) {
    Object.assign(this, serializedRoom);
    this.gameType = gameTypes[this.gameTypeId];

    this.players[0].color = 'rgb(100, 100, 193)';
    this.players[0].idx = 0;
    this.players[1].color = 'rgb(234, 123, 123)';
    this.players[1].idx = 1;
    this.own = this.players[this.ownIdx];
    this.opp = this.players[(this.ownIdx + 1) % 2];

    this.gameType.deserialize(this);
  }

  setIsReady(isReady = true) {
    this.io.emit('room:setIsReady', {
        roomId: this.roomId,
        isReady
      }
    );
  }
}
