import Cell from './cell';

export default class Board extends Array {
  constructor(raw = [[Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
                      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
                      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY]]) {
    super();
    this.push.apply(this, raw);

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

  clone() {
    return this.map(function (row) {
      return row.slice(0);
    });
  }
  serialize() {
    return this.map(function (row) {
      return row.map(function (cell) {
        return cell.key;
      });
    });
  }
  static deserialize(raw) {
    return new Board(raw.map(function (row) {
      return row.map(function (rawCell) {
        return Cell.deserialize(rawCell);
      });
    }));
  }
}
