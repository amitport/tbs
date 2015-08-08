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
}
Cell.EMPTY = new Cell('_');
Cell.X = new Cell('X');
Cell.O = new Cell('O');

Cell.X.opposite = Cell.O;
Cell.O.opposite = Cell.X;
