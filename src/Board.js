import { EMPTY, GAME_RESULT, RED } from "./constants";
import InvalidMove from "./InvalidMove";
import _ from "lodash";

const WINNING_NUMBER_OF_CONNECTIONS = 4;

class Board {
  constructor(numberOfRows = 6, numberOfColumns = 7, initialState = []) {
    this._state = initialState;

    if (this._state.length === 0) {
      for (let i=0; i < numberOfRows; i++) {
        this._state.push(new Array(numberOfColumns).fill(EMPTY))
      }
    }
  }

  dropTokenIntoColumn(token, column) {
    if ((column < 0) || (column >= this._state[0].length)) {
      throw new InvalidMove(`Invalid column number: ${column + 1}`);
    }

    for (let row=this._state.length-1; row >= 0; row--) {
      if (this._state[row][column] === EMPTY) {
        this._state[row][column] = token;
        return;
      }
    }

    throw new InvalidMove("Column is full");
  }

  isGameOver() {
    const everyCellFilled = this._state.every(row => row.every(cell => cell !== EMPTY));
    if (everyCellFilled) {
      return GAME_RESULT.DRAW;
    }

    let result = GAME_RESULT.INCOMPLETE;

    this._state.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        if (cell === EMPTY) {
          return;
        }

        if (this._isConnectFour(rowIdx, colIdx)) {
          if (cell === RED) {
            result = GAME_RESULT.RED_WINS;
          } else {
            result = GAME_RESULT.YELLOW_WINS;
          }
        }
      });
    });

    return result;
  }

  state() {
    return this._state;
  }

  validMoves() {
    const columnsWithSpace = [];

    this._state[0].reduce((acc, cell, colIdx) => {
      if (cell === EMPTY) {
        acc.push(colIdx)
      }

      return acc;
    }, columnsWithSpace);

    return columnsWithSpace;
  }

  _isConnectFour(rowIdx, colIdx) {
    const firstCell = this._state[rowIdx][colIdx];
    let isConnectedColumn = true;
    let isConnectedRow = true;
    let isConnectedTopToBottomDiagnol = true;
    let isConnectedBottomToTopDiagnol = true;

    for (let i=1; i < WINNING_NUMBER_OF_CONNECTIONS; i++) {
      isConnectedColumn = isConnectedColumn && (this._tokenAt(rowIdx + i, colIdx) === firstCell);
      isConnectedRow = isConnectedRow && (this._tokenAt(rowIdx, colIdx + i) === firstCell);
      isConnectedTopToBottomDiagnol = isConnectedTopToBottomDiagnol && (this._tokenAt(rowIdx + i, colIdx + i) === firstCell);
      isConnectedBottomToTopDiagnol = isConnectedBottomToTopDiagnol && (this._tokenAt(rowIdx + i, colIdx - i) === firstCell);
    }

    return isConnectedRow ||
           isConnectedColumn ||
           isConnectedTopToBottomDiagnol ||
           isConnectedBottomToTopDiagnol;
  }

  _tokenAt(rowIdx, colIdx) {
    if (rowIdx < 0 || rowIdx >= this._state.length) {
      return undefined;
    }

    return this._state[rowIdx][colIdx];
  }
}

export default Board
