import './index.css!';
import template from '../play-local/post-session-dialog.html!text';

import waitForOppDialogTemplate from './wait-for-opp-dialog.html!text';

export default class Room {
  constructor($scope, $routeParams, $mdDialog, $location, $log, $timeout, gameClientRepo, io, user) {
    io.connect($scope)
      .on('room:update', this.update.bind(this));

    const roomId = this.roomId = $routeParams.roomId;
    this.io = io;

    user.signInPromise.finally(() => {
      io.emit('room:join', {roomId: this.roomId, username: user.username}).then((msg) => {
        this.gameClient = gameClientRepo.get(msg.room.gameId);

        this.session = this.gameClient.createSessionProxy({}, msg.ownIdx, this.roomId, io);

        this.members = msg.room.members;
        this.members.opp = this.members[(msg.ownIdx + 1) % 2];
        this.members.own = this.members[msg.ownIdx];
        this.members.own.idx = msg.ownIdx;

        this.update(msg.room);
      }, function (err) {
        $log.error(err);
      });
    });

    let preGameDialog = false;
    $scope.$watch('room.members[1].type', (newVal) => {
      if (newVal === 'AI') {
        io.emit('room:setAiOpponent',
          {
            roomId
          }
        );
      }
    });
    $scope.$watch('room.members', (newVal) => {
      if (newVal != null) {
        if (!preGameDialog && newVal.some((member) => !member.ready)) {
          preGameDialog = $timeout(()=>{}, 600)
            .then(() => {return $mdDialog.show(
              {
                template: waitForOppDialogTemplate,
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                  address: $location.absUrl(),
                  members: this.members,
                  stat: this.stat,
                  session: this.session,
                  hasAi: this.gameClient.hasAi
                },
                controller: [function () {
                  if (!this.hasAi) {
                    this.members[1].type = 'Human';
                  }
                  this.setReady = (ready) => {
                    io.emit('room:ready',
                      {
                        roomId,
                        isReady: ready
                      }
                    );
                  };
                }]
              })
            }).finally(() => {preGameDialog = false;});
        } else if (newVal.every((member) => member.ready)) {
          $mdDialog.hide();
        }
      }
    }, true);
    $scope.$on('$destroy', function () {
      $mdDialog.hide();
    });

    this.$timeout = $timeout;
    this.$mdDialog = $mdDialog;
  }

  update(raw) {
    const stat = this.stat = raw.stat;

    for (let i = 0, len = this.members.length; i < len; i++) {
      Object.assign(this.members[i], raw.members[i]);
    }

    if (raw.session) this.gameClient.updateSessionState(this.session, raw.session);
  }

  ready() {
    this.io.emit('room:ready', {roomId: this.roomId});
  }
}

Room.$inject = ['$scope', '$routeParams', '$mdDialog', '$location', '$log', '$timeout', 'gameClientRepo', 'io', 'ap.user'];
