import module from '../base';
import roomTpl from './index.html!text';
import './index.css!';

import * as gameTypes from '../../../games/index';

module.component('room', {
  template: roomTpl,
  controller: class Room {
    static $inject = ['$scope', '$routeParams', '$location', '$log', 'io', 'ap.user', 'playerColors'];

    constructor($scope, $routeParams, $location, $log, io, user, playerColors) {
      this.playerColors = playerColors;
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

      this.players[0].color = this.playerColors[0];
      this.players[0].idx = 0;
      this.players[1].color = this.playerColors[1];
      this.players[1].idx = 1;
      this.own = this.players[this.ownIdx];
      this.opp = this.players[(this.ownIdx + 1) % 2];
    }

    gameAction({type, payload}) {
      this.io.emit('room:gameAction', {roomId: this.roomId, type, payload});
    }

    setIsReady(isReady = true) {
      this.io.emit('room:setIsReady', {
          roomId: this.roomId,
          isReady
        }
      );
    }
  }
});
