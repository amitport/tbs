import '../room/index.css!';
import template from './post-session-dialog.html!text';

export default class Room {
  constructor($routeParams, $mdDialog, $timeout, gameClientRepo, user) {
    const gameClient = gameClientRepo.get($routeParams.gameTypeId);
    let session, members, stat;
    session = this.session = gameClient.createLocalSession((result) => {
      $timeout(() => {
      $mdDialog.show(
          {
            template,
            controllerAs: '$ctrl',
            controller: ['$mdDialog', function ($mdDialog) {
              this.own = session.players.own;
              this.opp = session.players.opp;
              this.stat = stat;

              this.playAgain = () => {
                session.recycle();
                members[0].ready = true;
                $mdDialog.hide();
              };
            }]
          }
        );
      }, 600);
      this.members[0].ready = false;

      if (result !== 'tie') {
        this.stat[this.session.currentPlayer.idx]++;
      }
    });

    stat = this.stat = [0, 0];
    user.signInPromise.finally(() => {
      members = this.members = [{ready: true, username: user.username || 'you'}, {ready: true, username: '<ai>'}];
      this.members.own = this.members[0];
      this.members.opp = this.members[1];
      this.status = 'IN_PROGRESS';
    });
  }

  ready() {
    this.session.recycle();
    this.members[0].ready = true;
  }
}

Room.$inject = ['$routeParams', '$mdDialog', '$timeout', 'gameClientRepo', 'ap.user'];
