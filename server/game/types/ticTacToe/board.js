import Cell from './cell';

export default class Board extends Array {
  constructor() {
    super();
    this.push.apply(this, [[Cell.EMPTY, Cell.EMPTY, Cell.EMPTY], [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY], [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY]]);

    Object.freeze(this);
  }

  getEmptyCells() {
    const res = [];
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (this[x][y] === Cell.EMPTY)
          res.push([x, y])
      }
    }
    return res;
  }

  serialize() {
    return this.map(function (row) {
      return row.map(function (cell) {
        return cell.key;
      });
    });
  }
}
