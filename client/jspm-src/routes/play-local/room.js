export default class Room {
  constructor(gameClient) {
    this.session = gameClient.createLocalSession((result) => {
      this.members[0].ready = false;

      if (result !== 'tie') {
        this.stat[this.session.currentPlayer.idx]++;
      }
    });

    this.stat = [0, 0];
    this.members = [{ready: true}, {ready: true}];
    this.members.own = this.members[0];
    this.members.opp = this.members[1];
    this.status = 'IN_PROGRESS';
  }

  ready() {
    this.session.recycle();
    this.members[0].ready = true;
  }
}
