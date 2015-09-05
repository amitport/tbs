
import Player from '../../abstract/master/player';

export default class TicTacToeHumanPlayer extends Player {
  constructor(idx, mark) {
    super(idx);
    this.mark = mark
  }
  serialize() {
    const serialized = super.serialize();
    serialized.mark = this.mark.key;
    return serialized;
  }

  toString() {
    return `<player ${this.mark.key}>`;
  }
}
