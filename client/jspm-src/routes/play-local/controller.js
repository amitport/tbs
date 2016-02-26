import '../room/index.css!';

export default class Room {
  constructor($routeParams, gameClientRepo, user) {
    const gameClient = gameClientRepo.get($routeParams.gameTypeId);

    this.session = gameClient.createLocalSession((result) => {
      this.members[0].ready = false;

      if (result !== 'tie') {
        this.stat[this.session.currentPlayer.idx]++;
      }
    });

    this.stat = [0, 0];
    user.signInPromise.finally(() => {
      this.members = [{ready: true, username: user.username || 'you'}, {ready: true, username: '<ai>'}];
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

Room.$inject = ['$routeParams', 'gameClientRepo', 'ap.user'];
