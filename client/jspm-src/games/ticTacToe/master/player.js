import Cell from './cell';
import Player from '../../abstract/master/player';

export default class TicTacToeHumanPlayer extends Player {
  constructor(idx) {
    super(idx);
    this.mark = [Cell.X, Cell.O][idx];
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
