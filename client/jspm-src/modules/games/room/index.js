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

      $scope.$watch('$ctrl.players', (newPlayers, oldPlayers) => {
        if (oldPlayers == null) return;
        for (let i = 0, len = this.players.length; i < len; i++) {
          if (i === this.ownIdx) continue;

          const newPlayer = newPlayers[i];
          const oldPlayer = oldPlayers[i];

          if (newPlayer.type !== oldPlayer.type) {
            if (newPlayer.type === 'ai') {
              io.emit('room:joinAi',
                {
                  roomId
                }
              );
            } else if (newPlayer.type === 'human') {
              io.emit('room:setIsOpen',
                {
                  roomId, playerIdx: 1, isOpen: true
                }
              );
            }
            break;
          }
        }
      }, true);
    }

    waitingForPlayers() {
      return this.players && this.players.some((player) => player.type === 'human' && player.isOpen);
    }

    update(serializedRoom) {
      Object.assign(this, serializedRoom);
      this.gameType = gameTypes[this.gameTypeName];

      this.players.forEach((player, idx) => {
        player.color = this.playerColors[idx];
        player.idx = idx;
      });

      this.own = this.players[this.ownIdx];
    }

    canStart() {
      return this.players && !this.own.isReady && !this.game.isInProgress && !this.waitingForPlayers() &&
        this.players.every((player) => player.type);
    }

    calcBorderStyle() {
      if (!this.hasOwnProperty('players')) return {};

      // todo make game border into something generic
      if (this.players.length === 2) {
        return {
          'border-bottom-color': this.players[this.ownIdx].color,
          'border-top-color': this.players[(this.ownIdx + 1) % 4].color,
        }
      }
      if (this.players.length === 4) {
        return {
          'border-bottom-color': this.players[this.ownIdx].color,
          'border-left-color': this.players[(this.ownIdx + 1) % 4].color,
          'border-top-color': this.players[(this.ownIdx + 2) % 4].color,
          'border-right-color': this.players[(this.ownIdx + 3) % 4].color
        }
      }
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
