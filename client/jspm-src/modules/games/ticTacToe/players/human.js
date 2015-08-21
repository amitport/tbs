
import HumanPlayer from '../../lib/humanPlayer';

export default class TicTacToeHumanPlayer extends HumanPlayer {
  constructor(idx, mark) {
    super(idx);
    this.mark = mark
  }
  serialize() {
    return {mark: this.mark.key};
  }

  toString() {
    return `<player ${this.mark.key}>`;
  }
}
