export default class Player {
  constructor(idx) {
    this.idx = idx;
  }

  makeMove(){
    // doing nothing automatically is appropriate for human players
    // should be overridden by AI players
  }

  serialize() {
    return {idx: this.idx};
  }
}
