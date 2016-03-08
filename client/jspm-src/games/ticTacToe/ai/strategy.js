
import Cell from '../cell';

/**
 * count potentially winning lines
 * @returns [<count of EMPTY lines>, <count of 1 in the same line>, <count of 2 in the same line>,
 *                      <count of 3 in the same line (win)>]
 */
export function calcPotentialLines(board) {
  const markCounts = {
    rows:
      [{[Cell.EMPTY.key]: 0, [Cell.X.key]: 0, [Cell.O.key]: 0}, {[Cell.EMPTY.key]: 0, [Cell.X.key]: 0, [Cell.O.key]: 0}, {[Cell.EMPTY.key]: 0, [Cell.X.key]: 0, [Cell.O.key]: 0}],
    cols:
      [{[Cell.EMPTY.key]: 0, [Cell.X.key]: 0, [Cell.O.key]: 0}, {[Cell.EMPTY.key]: 0, [Cell.X.key]: 0, [Cell.O.key]: 0}, {[Cell.EMPTY.key]: 0, [Cell.X.key]: 0, [Cell.O.key]: 0}],
    diags:
      [{[Cell.EMPTY.key]: 0, [Cell.X.key]: 0, [Cell.O.key]: 0}, {[Cell.EMPTY.key]: 0, [Cell.X.key]: 0, [Cell.O.key]: 0}]
  };

  for (let x = 0; x < 3; x++) {
    // group and count the elements in the x row/column
    for (let y = 0; y < 3; y++) {
      markCounts.rows[x][board[x][y]]++;
      markCounts.cols[x][board[y][x]]++;
    }
    // group and count the elements in the diagonals
    markCounts.diags[0][board[x][x]]++;
    markCounts.diags[1][board[2 - x][x]]++;
  }
  const potentialLines = {
    [Cell.X.key]: [0, 0, 0, 0],
    [Cell.O.key]: [0, 0, 0, 0]
  };

  for (let lineType in markCounts) {
    for (let markCount of markCounts[lineType]) {
      const xCount = markCount[Cell.X.key];
      const oCount = markCount[Cell.O.key];
      // this line does not have both X and O meaning it is a potential line
      if (xCount === 0 || oCount === 0) {
        potentialLines[Cell.X.key][xCount]++;
        potentialLines[Cell.O.key][oCount]++;
      }
    }
  }

  return potentialLines;
}

export function calcScores(board, mark) {
  const potentialLines = calcPotentialLines(board);
  const opposite = (mark === 'X') ? 'O' : 'X';
  /**
   * [<own 3 in line (win)>, -<opp 2 in line (opp wins next)>, <own 2 in line (own win if not blocked)>, -<opp 1 in line (interfere>]
   */
  return [potentialLines[mark][3], -potentialLines[opposite][2],  potentialLines[mark][2], -potentialLines[opposite][1]];
}

