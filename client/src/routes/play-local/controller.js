import '../room/index.css!';

export default class Room {

  static $inject = ['$routeParams', 'gameClientRepo', 'ap.user'];

  constructor($routeParams, gameClientRepo, user) {
    const gameClient = gameClientRepo.get($routeParams.gameTypeName);

    this.session = gameClient.createLocalSession((result) => {
      this.members[0].ready = false;

      if (result !== 'tie') {
        this.stat[this.session.currentPlayer.idx]++;
      }
    });

    this.stat = [0, 0];
    user.signInPromise.finally(() => {
      this.members = [{ready: true, username: user.username || 'you'}, {ready: true, username: '{AI}'}];
      this.members.own = this.members[0];
      this.members.own.idx = 0;

      this.members.opp = this.members[1];
    });
  }

  ready() {
    this.session.recycle();
    this.members[0].ready = true;
  }
}
