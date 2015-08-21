export default class Cell {
  constructor(key) {
    this.key = key;
  }

  toString() {
    return this.key;
  }

  isEmpty() {
    return this === Cell.EMPTY;
  }

  static deserialize(raw) {
    switch (raw) {
      case '_': return Cell.EMPTY;
      case 'X': return Cell.X;
      case 'O': return Cell.O;
      default: throw 'unrecognized cell';
    }
  }
}

Cell.EMPTY = new Cell('_');
Cell.X = new Cell('X');
Cell.O = new Cell('O');

Cell.X.opposite = Cell.O;
Cell.O.opposite = Cell.X;
