import Game from '../game';


export default class IsraeliWhist extends Game {
  static color = '#e09292';
  static actions = {};
  //static disabled = true;

  static initializeRoom(room) {
    super.initializeRoom(room, 4);

    room.game.deck = [];
    for (var s = 0; s < 4; s++) {
      for (var r = 0; r < 13; r++) {
        room.game.deck.push({
          rank: r,
          suit: s
        });
      }
    }
  }
}
