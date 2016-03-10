export default class Game {
  $onInit() {
    Object.keys(this.room.gameType.actions).forEach((actionType) => {
      this[actionType] = (payload) => this.room.gameAction({type: actionType, payload});
    });
  }
}
