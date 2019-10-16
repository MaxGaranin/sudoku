module.exports = function solveSudoku(matrix) {
  let emptyPositions = _saveEmptyPositions(matrix);
  _solve(matrix, emptyPositions);
  return matrix;

  function _solve(matrix, emptyPositions) {
    const limit = 9;
    let i, row, column, value, found;

    for (i = 0; i < emptyPositions.length;) {
      row = emptyPositions[i][0];
      column = emptyPositions[i][1];
      
      value = matrix[row][column] + 1;
      found = false;

      while (!found && value <= limit) {
        if (_checkValue(matrix, column, row, value)) {
          found = true;
          matrix[row][column] = value;
          i++;
        }
        else {
          value++;
        }
      }

      if (!found) {
        matrix[row][column] = 0;
        i--;
      }
    }
  }

  function _saveEmptyPositions(matrix) {
    let emptyPositions = [];

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 0) {
          emptyPositions.push([i, j]);
        }
      }
    }

    return emptyPositions;
  }

  function _checkRow(matrix, row, value) {
    for (let i = 0; i < matrix[row].length; i++) {
      if (matrix[row][i] === value) {
        return false;
      }
    }
    
    return true;
  };

  function _checkColumn(board, column, value) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][column] === value) {
        return false;
      }
    }
    
    return true;
  };

  function _check3x3Square(matrix, column, row, value) {
    let columnCorner = 0,
      rowCorner = 0,
      squareSize = 3;

    while (column >= columnCorner + squareSize) {
      columnCorner += squareSize;
    }

    while (row >= rowCorner + squareSize) {
      rowCorner += squareSize;
    }

    for (let i = rowCorner; i < rowCorner + squareSize; i++) {
      for (let j = columnCorner; j < columnCorner + squareSize; j++) {
        if (matrix[i][j] === value) {
          return false;
        }
      }
    }
    
    return true;
  };

  function _checkValue(matrix, column, row, value) {
    if (_checkRow(matrix, row, value) &&
      _checkColumn(matrix, column, value) &&
      _check3x3Square(matrix, column, row, value)) {
      return true;
    } else {
      return false;
    }
  };
}
